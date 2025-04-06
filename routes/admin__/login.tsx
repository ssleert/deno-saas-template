import { Handlers, PageProps } from "$fresh/server.ts";
import { KV } from "/db/mod.ts";
import env from "/utils/env.ts";
import consts from "/utils/consts.ts";

interface LoginProps {
  error?: string;
}

export const handler: Handlers<LoginProps> = {
  async GET(_req, ctx) {
    return await ctx.render({ error: undefined });
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const key = form.get("key")?.toString();

    if (!key || key !== env.ADMIN_SECURE_KEY) {
      return await ctx.render({ error: "Invalid key" }, { status: 401 });
    }

    const token = crypto.randomUUID();

    const db = await new KV().connect();
    await db.setAdminToken(token, 86400000); // 24 hours

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/admin__/dashboard",
        "Set-Cookie":
          `${consts.AdminAuthCookieName}=${token}; Path=/; HttpOnly; Secure; Max-Age=86400; SameSite=Strict`,
      },
    });
  },
};

export default function AdminLogin(props: PageProps<LoginProps>) {
  const error = props.data.error;

  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md mx-4">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <h1 class="text-2xl font-semibold text-gray-900 text-center mb-6">
            Admin Login
          </h1>

          <form method="POST" class="space-y-6">
            <div>
              <label
                for="key"
                class="block text-sm font-medium text-gray-700 mb-1"
              >
                Security Key
              </label>
              <input
                type="password"
                name="key"
                id="key"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-900 focus:border-gray-900 text-gray-900"
                placeholder="Enter your admin key"
              />
            </div>

            {error && (
              <p class="text-red-600 text-sm text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              class="w-full bg-gray-900 text-white py-2.5 font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
