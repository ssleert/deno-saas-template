import { MiddlewareHandler } from "$fresh/server.ts";

import getLogger from "/middleware/logger.ts";

export const handler: MiddlewareHandler[] = [
  getLogger(),
];
