import { createRoute } from "@hono/zod-openapi";

import { ErrorResponse } from "@/models/error";
import { DeleteSkuParamSchema, SkuSchema } from "@/models/sku";

export const deleteSkuRoute = createRoute({
  path: "/{skuId}",
  method: "delete",
  description: "SKUの削除",
  request: {
    params: DeleteSkuParamSchema,
  },
  responses: {
    200: {
      description: "Success",
      content: {
        "application/json": {
          schema: SkuSchema,
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: ErrorResponse,
        },
      },
    },
  },
});
