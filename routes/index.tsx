import { useSignal } from "@preact/signals";
import { asset } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Counter from "../islands/Counter.tsx";
import { KV } from "/db/mod.ts";

type HomeProps = {
  dbStatus: boolean;
};

export const handler: Handlers<HomeProps> = {
  async GET(_req, ctx) {
    const db = await new KV().connect();

    const dbStatus = await db.check();

    return ctx.render({ dbStatus });
  },
};

export default function Home(props: PageProps<HomeProps>) {
  const count = useSignal(3);
  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac]">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src={asset("/logo.svg")}
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4 prose">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
      <p>
        Is DB ok?: {props.data.dbStatus ? "True" : "False"}.
      </p>
    </div>
  );
}
