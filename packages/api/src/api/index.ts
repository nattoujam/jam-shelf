import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

import { skuApi } from "@/api/sku";

export const api = new OpenAPIHono();

api
  .route("/api/sku", skuApi)
  .doc("/api/specification", {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
    },
  })
  .get(
    "/api/doc",
    swaggerUI({
      url: "/api/specification",
    })
  );
