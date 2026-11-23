import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

const createUserRecord = async () => {
  return await prisma.user.upsert({
    where: { id: "seed-user" },
    update: {},
    create: {
      id: "seed-user",
      name: "シードユーザー",
      email: "seed-user@example.com",
    },
  });
};

const createSkuRecords = async (userId: string) => {
  const sku1 = "石鹸";
  await prisma.sku.upsert({
    where: { userId_name: { userId, name: sku1 } },
    update: {},
    create: {
      userId,
      name: sku1,
      stock: 10,
      unit: "個",
    },
  });

  const sku2 = "塩";
  await prisma.sku.upsert({
    where: { userId_name: { userId, name: sku2 } },
    update: {},
    create: {
      userId,
      name: sku2,
      stock: 2,
      unit: "袋",
      warnThreshold: 2,
    },
  });

  const sku3 = "砂糖";
  await prisma.sku.upsert({
    where: { userId_name: { userId, name: sku3 } },
    update: {},
    create: {
      userId,
      name: sku3,
      stock: 2,
      unit: "袋",
      warnThreshold: 3,
      dangerThreshold: 2,
    },
  });
};

const main = async () => {
  const user = await createUserRecord();
  await createSkuRecords(user.id);
};

try {
  main();
} catch (e) {
  console.error(e);
} finally {
  prisma.$disconnect();
}
