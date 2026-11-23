import { OpenAPIHono } from "@hono/zod-openapi";

import { prisma } from "@/db";
import { getSkuRoute } from "@/api/sku/get";
import { updateSkuRoute } from "@/api/sku/update";
import { createSkuRoute } from "@/api/sku/create";
import { deleteSkuRoute } from "@/api/sku/delete";

export const skuApi = new OpenAPIHono();

const InternalServerErrorResponse = (e: any) => ({
  message: "Internal Server Error",
  stackTrace: e,
});

skuApi.openapi(getSkuRoute, async (c) => {
  try {
    const skuList = await prisma.sku.findMany({
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
      where: { id: skuId },
      data: {
        ...body,
      },
    });

    return c.json(sku, 200);
  } catch (e) {
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
      where: { id: skuId },
    });

    return c.json(sku, 200);
  } catch (e) {
    return c.json(InternalServerErrorResponse(e), 500);
  }
});
