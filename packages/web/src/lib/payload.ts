import config from "@payload-config";
import { getPayload as getPayloadOriginal } from "payload";

export const getPayload = () => getPayloadOriginal({ config });
