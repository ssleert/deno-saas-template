import { MiddlewareHandler } from "$fresh/server.ts";
import adminAuth from "/middleware/adminAuth.ts";

export const handler: MiddlewareHandler[] = [adminAuth];
