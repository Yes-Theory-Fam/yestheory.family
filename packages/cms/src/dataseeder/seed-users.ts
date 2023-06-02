import { upsert } from "./upsert";

export const seedUsers = async () => {
  await upsert({
    key: "email",
    collection: "users",
    data: {
      email: process.env.INITIAL_ADMIN_MAIL ?? "admin@example.com",
      password: process.env.INITIAL_ADMIN_PASSWORD ?? "123456",
    },
  });
};
