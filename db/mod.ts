import { KvToolbox, openKvToolbox } from "@kitsonk/kv-toolbox";
import env from "/utils/env.ts";
import { createQueueValueHandler } from "deno-kv-insights/mod.ts";

export type KVOptions = {
  listenQueue?: boolean;
};

export class KV {
  static #instance: KV;

  #listenQueue: boolean = false;

  #queueInsightHandler: (
    value: unknown,
  ) => Promise<void> = async (value) => {
    await console.trace("Queue:", value);
  };

  kv: KvToolbox = null as unknown as KvToolbox;

  constructor(options?: KVOptions) {
    if (KV.#instance) return KV.#instance;

    this.#listenQueue = options?.listenQueue ?? false;

    if (this.#listenQueue) {
      this.#queueInsightHandler = createQueueValueHandler();
    }

    KV.#instance = this;
  }

  #getQueueListener() {
    return async (value: unknown) => {
      await this.#queueInsightHandler(value);
      console.trace("Queue:", value);
    };
  }

  async connect() {
    if (this.kv) return this;

    this.kv = await openKvToolbox({ path: env.DENO_KV_URL });

    if (this.#listenQueue) {
      this.kv.listenQueue(this.#getQueueListener());
    }

    return this;
  }

  async check() {
    await this.kv.set(["internal", "check"], "ok");
    const res = await this.kv.get<string>(["internal", "check"]);
    return res.value != null;
  }

  async setAdminToken(token: string, expireIn: number) {
    await this.kv.set(
      [
        "internal",
        "admin",
        "token",
        token,
      ],
      true,
      { expireIn },
    );
  }

  async checkAdminToken(token: string) {
    const res = await this.kv.get<boolean>([
      "internal",
      "admin",
      "token",
      token,
    ]);

    return res.value ?? false;
  }

  async removeAdminToken(token: string) {
    await this.kv.delete([
      "internal",
      "admin",
      "token",
      token,
    ]);
  }
}
