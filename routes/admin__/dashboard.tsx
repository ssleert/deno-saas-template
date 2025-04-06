import { Handlers, PageProps } from "$fresh/server.ts";
import { KV } from "/db/mod.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    return await ctx.render();
  },

  async DELETE(_, ctx) {
    const db = await new KV().connect();
    await db.removeAdminToken((ctx.state.adminToken ?? "") as string);

    return await ctx.renderNotFound();
  },

  async POST(req, ctx) {
    const form = await req.formData();
    const method = form.get("_method")?.toString();

    if (method === "DELETE") {
      return await handler.DELETE!(req, ctx) ?? ctx.renderNotFound();
    }

    return await ctx.renderNotFound();
  },
};

export default function AdminDashboard(_props: PageProps) {
  return (
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="w-full max-w-md mx-4">
        <div class="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
          <h1 class="text-2xl font-semibold text-gray-900 text-center mb-6">
            Admin Dashboard
          </h1>
          <div class="space-y-6">
            <div class="text-center">
              <p class="text-gray-600">Welcome to the admin panel</p>
            </div>
            <a
              href="/admin__/image-upload"
              class="w-full block text-center bg-blue-600 text-white py-2.5 font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
            >
              Upload Image
            </a>
            <a
              href="/kv-insights"
              class="w-full block text-center bg-blue-600 text-white py-2.5 font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 transition-colors"
            >
              View KV Insights
            </a>
            <form action="/admin__/dashboard" method="POST">
              <input type="hidden" name="_method" value="DELETE" />
              <button
                type="submit"
                class="w-full bg-gray-900 text-white py-2.5 font-medium rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
