FROM oven/bun:latest as base

FROM base AS build
WORKDIR /app
COPY --link . .
RUN bun install
RUN bunx @tailwindcss/cli -i ./dev/tailwind.css -o ./apps/frontend/shared/public/dist/style.css
RUN bun build ./apps/frontend/__init__/App.tsx --outdir ./apps/frontend/shared/public/dist --target browser --entry-naming app.[ext] --asset-naming [hash].[ext] --watch


FROM base as runtime
WORKDIR /app
RUN apt-get update && apt-get install -y curl
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps ./apps
COPY --from=build /app/bin ./bin
COPY --from=build /app/commands ./commands
COPY --from=build /app/migrations ./migrations
COPY --from=build /app/seeds ./seeds
COPY --from=build /app/tsconfig.json ./tsconfig.json
EXPOSE 3000
CMD bunx serve ./apps/frontend -p 3000 -s
