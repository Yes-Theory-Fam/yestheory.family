import { upsert } from "./upsert";

export const seedUsers = async () => {
  await upsert({
    key: "email",
    collection: "users",
    data: {
      email: "admin@example.com",
      password: "123456",
    },
  });
};
