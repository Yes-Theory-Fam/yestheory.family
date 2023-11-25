import path from "node:path";

import { initPayload } from "../init-payload";
import { seedUsers } from "./seed-users";
import { seedGroupchats } from "./seed-groupchats";

export const main = async () => {
  process.env.PAYLOAD_CONFIG_PATH = path.resolve(
    __dirname,
    `../payload.config${path.extname(__filename)}`
  );

  await initPayload({ local: true });

  await seedUsers();
  await seedGroupchats();

  process.exit();
};

void main();
