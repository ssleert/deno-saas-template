import { defineConfig } from "$fresh/server.ts";
import tailwind from "@pakornv/fresh-plugin-tailwindcss";
import { kvInsightsPlugin } from "deno-kv-insights/mod.ts";
import env from "/utils/env.ts";
import { KV } from "/db/mod.ts";

const kv = (await new KV().connect()).kv.db;
export default defineConfig({
  plugins: [tailwind(), kvInsightsPlugin({ kv })],
  server: {
    port: Number(env.PORT),
    reusePort: true,
    cert: Deno.readTextFileSync("./certs/localhost.crt"),
    key: Deno.readTextFileSync("./certs/localhost.key"),
  },
  build: {
    target: "esnext",
  },
});
