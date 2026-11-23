import { createRoute } from "@hono/zod-openapi";

import { ErrorResponse } from "@/models/error";
import {
  SkuSchema,
  UpdateSkuParamSchema,
  UpdateSkuRequestSchema,
} from "@/models/sku";

export const updateSkuRoute = createRoute({
  path: "/{skuId}",
  method: "put",
  description: "SKUの編集",
  request: {
    params: UpdateSkuParamSchema,
    body: {
      required: true,
      content: {
        "application/json": {
          schema: UpdateSkuRequestSchema,
        },
      },
    },
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
