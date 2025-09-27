import concurrently from 'concurrently';

const { result } = concurrently(
  [
    {
      command: 'cd dev && docker compose up --build',
      name: 'dev:docker',
    },
    {
      command:
        'bunx @tailwindcss/cli -i ./dev/tailwind.css -o ./apps/frontend/shared/public/dist/style.css --watch',
      name: 'tailwindcss',
    },
    {
      command:
        'bun build ./apps/frontend/__init__/App.tsx --outdir ./apps/frontend/shared/public/dist --target browser --entry-naming app.[ext] --asset-naming [hash].[ext] --watch',
      name: 'frontend:build',
    },
    {
      command: 'bunx serve ./apps/frontend -p 3000 -s',
      name: 'frontend:app',
    },
    {
      command: 'bun run --hot ./apps/backend/index.ts',
      name: 'backend:api',
    },
  ],
  {
    hide: ['tailwindcss', 'dev:docker'],
  },
);

result.catch((error) => {
  console.error(error);
});
