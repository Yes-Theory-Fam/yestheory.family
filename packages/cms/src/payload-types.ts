/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    groupchats: Groupchat;
  };
  globals: {};
}
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  password?: string;
}
export interface Groupchat {
  id: string;
  name: string;
  url: string;
  keywords: {
    value?: string;
    id?: string;
  }[];
  description?: string;
  platform: "discord" | "facebook" | "signal" | "telegram" | "whatsapp";
  updatedAt: string;
  createdAt: string;
}