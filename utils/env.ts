import "$std/dotenv/load.ts";

export default {
  PROJECT_NAME: Deno.env.get("PROJECT_NAME") ?? "template",
  PROJECT_NAME_UI: Deno.env.get("PROJECT_NAME_UI") ?? "Template",
  API_DESCRIPTION: Deno.env.get("API_DESCRIPTION") ?? "Template API",
  SERVER_URL: Deno.env.get("SERVER_URL") ?? "https://localhost:8000",
  PORT: Deno.env.get("PORT") ?? "8000",
  DENO_KV_URL: Deno.env.get("DENO_KV_URL"),
  ADMIN_SECURE_KEY: Deno.env.get("ADMIN_SECURE_KEY") ?? "replaceme",
};
