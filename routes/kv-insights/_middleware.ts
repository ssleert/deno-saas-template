import { MiddlewareHandler } from "$fresh/server.ts";
import { parseCookies } from "/utils/cookie.ts";
import consts from "/utils/consts.ts";
import { KV } from "/db/mod.ts";

const handleKVInsightsAuthorization: MiddlewareHandler = async (req, ctx) => {
  const cookies = parseCookies(req);
  const adminAuthValue = cookies[consts.AdminAuthCookieName];

  if (!adminAuthValue) {
    return ctx.renderNotFound();
  }

  const db = await new KV().connect();
  const isValid = await db.checkAdminToken(adminAuthValue);

  if (!isValid) {
    return await ctx.renderNotFound();
  }

  return await ctx.next();
};

export const handler: MiddlewareHandler[] = [handleKVInsightsAuthorization];
