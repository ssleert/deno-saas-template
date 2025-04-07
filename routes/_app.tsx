import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import env from "/utils/env.ts";

// checkout for reference
// https://github.com/h5bp/html5-boilerplate

export default function App(props: PageProps) {
  return (
    <html lang="">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{env.PROJECT_NAME_UI}</title>
        <link rel="stylesheet" href={asset("/styles.css")} />
        <meta name="description" content="" />

        <meta property="og:title" content="" />
        <meta property="og:type" content="" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="" />
        <meta property="og:image:alt" content="" />

        <link rel="icon" href={asset("/favicon.ico")} sizes="any" />
        <link rel="icon" href={asset("/icon.svg")} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={asset("icon.png")} />

        <link rel="manifest" href={asset("site.webmanifest")} />
        <meta name="theme-color" content="#fafafa" />
      </head>
      <body>
        <props.Component />
      </body>
    </html>
  );
}
