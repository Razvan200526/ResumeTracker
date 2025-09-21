import concurrently from "concurrently";

const { result } = concurrently(
  [
    {
      command:
        "bunx @tailwindcss/cli -i ./dev/tailwind.css -o ./apps/frontend/shared/public/dist/style.css --watch",
      name: "tailwindcss",
    },
    {
      command:
        "bun build ./apps/frontend/__init__/App.tsx --outdir ./apps/frontend/shared/public/dist --target browser --entry-naming app.[ext] --asset-naming [hash].[ext] --watch",
      name: "frontend:islands",
    },
    {
      command: "bun run --watch ./out/index.html",
      name: "frontend:app",
    },
  ],
  {
    hide: "tailwindcss",
  },
);

result.catch((error) => {
  console.error(error);
});
