import { Service } from "typedi";
import { AuthProvider } from "../user";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import { createServerLogger } from "../../services/logging/log";

const refreshUrls: Record<AuthProvider, string> = {
  [AuthProvider.DISCORD]: "https://discord.com/api/oauth2/token",
};

const revokeUrls: Record<AuthProvider, string> = {
  [AuthProvider.DISCORD]: "https://discord.com/api/oauth2/token/revoke",
};

@Service()
export class AuthService {
  public async refreshToken(
    refreshToken: string,
    authProvider: AuthProvider
  ): Promise<{ refreshToken: string; accessToken: string; expiresIn: number }> {
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

    const tokenResponse = await response.json();

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

    return { accessToken, refreshToken: newRefreshToken, expiresIn };
  }

  public async invalidateToken(
    token: string,
    provider: AuthProvider
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
}
