import { config } from "dotenv";
import payload from "payload";
import { type InitOptions } from "payload/config";

export const initPayload = async (additionalOptions?: Partial<InitOptions>) => {
  config();

  if (!process.env.PAYLOAD_SECRET) throw new Error("Missing PAYLOAD_SECRET");
  if (!process.env.MONGODB_URI) throw new Error("Missing MONGODB_URI");

  const mongoOptions = process.env.MONGO_PASSWORD
    ? {
        authSource: "admin",
        user: process.env.MONGO_USERNAME,
        pass: process.env.MONGO_PASSWORD,
      }
    : undefined;

  return await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    mongoOptions,
    ...additionalOptions,
  });
};
