import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";

import { auth } from "@/auth";
import { skuApi } from "@/api/sku";

export const api = new OpenAPIHono();

api.use("/api/sku/*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ message: "Unauthorized", ok: false }, 401);
  await next();
});

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
