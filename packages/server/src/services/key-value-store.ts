import { PrismaClient } from "@prisma/client";
import { Service } from "typedi";

@Service()
export class KeyValueStore {
  constructor(private readonly prisma: PrismaClient) {}

  async get(key: string): Promise<string | null> {
    const entity = await this.prisma.keyValue.findUnique({ where: { key } });

    return entity?.value ?? null;
  }

  async set(key: string, value: string) {
    await this.prisma.keyValue.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    });
  }
}
