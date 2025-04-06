import { Handler } from "$fresh/server.ts";
import { Hono } from "hono";

import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";

import env from "/utils/env.ts";
import status from "/api/status.ts";
import image from "/api/image.ts";

const app = new Hono().basePath("/api/v1");
export const route = app
  .route("/status", status)
  .route("/image", image)
  .get(
    "/openapi",
    // @ts-ignore ts cant correctly infer this type
    openAPISpecs(app, {
      documentation: {
        info: {
          title: `${env.PROJECT_NAME_UI} API`,
          version: "1.8.17", // DONT TOUCH IT SHOULD BE SOME PRODUCTION VERSION NOT THE FUCKING 0.0.0.0.1
          description: env.API_DESCRIPTION,
        },
        servers: [
          { url: env.SERVER_URL, description: "Main Server" },
        ],
      },
    }),
  )
  .get(
    "/docs",
    // @ts-ignore ts cant correctly infer overload for this call
    apiReference({
      url: "/api/v1/openapi",
    }),
  );

// TODO: submit issues for ts-ignores

export const handler: Handler = (r) => route.fetch(r);
export type AppType = typeof route;
