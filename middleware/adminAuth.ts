import { MiddlewareHandler } from "$fresh/server.ts";
import { parseCookies } from "/utils/cookie.ts";
import { KV } from "/db/mod.ts";
import consts from "/utils/consts.ts";

const adminAuth: MiddlewareHandler = async (req, ctx) => {
  const cookies = parseCookies(req);
  const adminToken = cookies[consts.AdminAuthCookieName] ?? "";
  const loginPage = req.url.endsWith("/admin__/login");

  if (!adminToken && !loginPage) {
    return ctx.renderNotFound();
  }

  const db = await new KV().connect();
  const isValid = await db.checkAdminToken(adminToken);
  if (!isValid && !loginPage) {
    return ctx.renderNotFound();
  }

  ctx.state.adminToken = adminToken;

  return await ctx.next();
};

export default adminAuth;
