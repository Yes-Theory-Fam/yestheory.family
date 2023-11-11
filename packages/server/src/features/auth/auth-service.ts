import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import fetch from "node-fetch";
import { Service } from "typedi";
import { URLSearchParams } from "url";
import { createServerLogger } from "../../services/logging/log";
import { YtfApolloContext } from "../../types";
import { AuthProvider } from "../user";

const refreshUrls: Record<AuthProvider, string> = {
  [AuthProvider.DISCORD]: "https://discord.com/api/oauth2/token",
};

const revokeUrls: Record<AuthProvider, string> = {
  [AuthProvider.DISCORD]: "https://discord.com/api/oauth2/token/revoke",
};

type RefreshTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
  token_type: string;
};

export interface YtfAuthContext {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export const discordAuthErrorCode = "DISCORD_AUTH_ERROR";
const discordAuthError = new Error(discordAuthErrorCode);

@Service()
export class AuthService {
  public async refreshToken(
    refreshToken: string,
    authProvider: AuthProvider,
  ): Promise<YtfAuthContext> {
    const logger = createServerLogger("authService", "refreshToken");

    if (authProvider !== AuthProvider.DISCORD) {
      throw new Error("Refreshing tokens is only implemented for Discord");
    }

    logger.debug("Refreshing token!");

    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;

    const body = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    const response = await fetch(refreshUrls[authProvider], {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokenResponse = (await response.json()) as RefreshTokenResponse;

    if (response.status !== 200) {
      logger.error("Refresh response was not positive; response is: ", {
        response,
        status: response.status,
        statusText: response.statusText,
        tokenResponse,
      });
      throw new Error(`Failed to refresh token: ${response.statusText}`);
    }

    const accessToken = tokenResponse.access_token;
    const newRefreshToken = tokenResponse.refresh_token;
    const expiresIn = tokenResponse.expires_in;

    const expiresAt = Date.now() + expiresIn * 1000;

    return { accessToken, refreshToken: newRefreshToken, expiresAt };
  }

  public async invalidateToken(
    token: string,
    provider: AuthProvider,
  ): Promise<void> {
    const revokeUrl = revokeUrls[provider];

    const body = new URLSearchParams({ token });

    await fetch(revokeUrl, {
      method: "POST",
      body,
      headers: {
        Authorization: AuthService.getAuthHeader(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

  private static getAuthHeader(): string {
    const clientId = process.env.DISCORD_CLIENT_ID;
    const clientSecret = process.env.DISCORD_CLIENT_SECRET;

    const authHeaderBase = `${clientId}:${clientSecret}`;
    const authHeader = Buffer.from(authHeaderBase).toString("base64");

    return `Basic ${authHeader}`;
  }

  public async ensureValidToken(
    ctx: YtfApolloContext,
  ): Promise<YtfAuthContext> {
    const { auth, user } = ctx;

    if (!auth || !user) throw discordAuthError;

    const nearOrPastExpiry = auth.expiresAt - Date.now() < 20 * 60 * 1000; // Consider token expired from 20 minutes before it actually expires

    if (nearOrPastExpiry) {
      try {
        const newAuth = await this.refreshToken(auth.refreshToken, user.type);
        if (ctx.requestContext.session) {
          ctx.requestContext.session.auth = newAuth;
          ctx.requestContext.session.save();
        }

        return newAuth;
      } catch {
        throw discordAuthError;
      }
    }

    const existingTokenWorks = this.attemptTokenUsage(auth.accessToken);
    if (!existingTokenWorks) throw discordAuthError;

    return auth;
  }

  private async attemptTokenUsage(token: string): Promise<boolean> {
    const rest = new REST({ version: "10" }).setToken(token);
    try {
      await rest.get(Routes.user());
      return true;
    } catch {
      return false;
    }
  }
}
