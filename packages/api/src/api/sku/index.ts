import { OpenAPIHono } from "@hono/zod-openapi";
import { Prisma } from "@database/generated/prisma";

import { prisma } from "@/db";
import { requireSession, type SessionEnv } from "@/auth";
import { getSkuRoute } from "@/api/sku/get";
import { updateSkuRoute } from "@/api/sku/update";
import { createSkuRoute } from "@/api/sku/create";
import { deleteSkuRoute } from "@/api/sku/delete";

export const skuApi = new OpenAPIHono<SessionEnv>();

skuApi.use(requireSession);

const InternalServerErrorResponse = (e: any) => ({
  message: "Internal Server Error",
  stackTrace: e,
});

function isRecordNotFound(e: unknown) {
  return e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2025";
}

skuApi.openapi(getSkuRoute, async (c) => {
  try {
    const skuList = await prisma.sku.findMany({
      where: { userId: c.get("user").id },
      orderBy: {
        id: "asc",
      },
    });

    return c.json(skuList, 200);
  } catch (e) {
    console.error(e);
    return c.json(InternalServerErrorResponse(e), 500);
  }
});

skuApi.openapi(createSkuRoute, async (c) => {
  try {
    const body = c.req.valid("json");

    const sku = await prisma.sku.create({
      data: {
        ...body,
        userId: c.get("user").id,
      },
    });

    return c.json(sku, 200);
  } catch (e) {
    return c.json(InternalServerErrorResponse(e), 500);
  }
});

skuApi.openapi(updateSkuRoute, async (c) => {
  try {
    const rawSkuId = c.req.valid("param").skuId;
    const skuId = Number.parseInt(rawSkuId);
    if (Number.isNaN(skuId))
      throw new Error("[Invalid Argument Error] Must be number: ${rawSkuId}");

    const body = c.req.valid("json");

    const sku = await prisma.sku.update({
      where: { id: skuId, userId: c.get("user").id },
      data: {
        ...body,
      },
    });

    return c.json(sku, 200);
  } catch (e) {
    if (isRecordNotFound(e)) return c.json({ message: "Not Found" }, 404);
    return c.json(InternalServerErrorResponse(e), 500);
  }
});

skuApi.openapi(deleteSkuRoute, async (c) => {
  try {
    const rawSkuId = c.req.valid("param").skuId;
    const skuId = Number.parseInt(rawSkuId);
    if (Number.isNaN(skuId))
      throw new Error("[Invalid Argument Error] Must be number: ${rawSkuId}");

    const sku = await prisma.sku.delete({
      where: { id: skuId, userId: c.get("user").id },
    });

    return c.json(sku, 200);
  } catch (e) {
    if (isRecordNotFound(e)) return c.json({ message: "Not Found" }, 404);
    return c.json(InternalServerErrorResponse(e), 500);
  }
});
