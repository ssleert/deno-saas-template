import { Hono } from "hono";
import { Type } from "@sinclair/typebox";
import { describeRoute } from "hono-openapi";
import { validator as tbValidator } from "hono-openapi/typebox";

const Request = Type.Object({
  x: Type.String(),
});

const Response = Type.Object({
  status: Type.String(),
});

const app = new Hono();
const route = app
  .get(
    "/",
    describeRoute({
      description: "check if server is down",
      responses: {
        200: {
          description: "Successful response",
          content: {
            "encoding/json": { schema: Response },
          },
        },
      },
    }),
    tbValidator("query", Request),
    (c) => {
      const q = c.req.valid("query");
      return c.json({ status: `i'm ok. dont kill me plz: x = ${q.x}` });
    },
  );

export default route;
export type StatusRouteType = typeof route;
