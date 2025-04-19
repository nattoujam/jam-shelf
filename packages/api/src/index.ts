import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { serve } from "@hono/node-server";
import { logger } from "hono/logger";
import { cors } from "hono/cors";

import { api } from "@/api";

const app = new Hono();

app.use(prettyJSON());
app.use(logger());
app.use("/api/*", cors());
app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));

app.route("/", api);

serve(
  {
    fetch: app.fetch,
    port: 5000,
  },
  (info) => {
    console.log(`listen... [${info.port}]`);
  }
);
