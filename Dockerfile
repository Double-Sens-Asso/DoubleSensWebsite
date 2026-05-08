# syntax=docker/dockerfile:1

FROM denoland/deno:2.7.14 AS build

WORKDIR /app

COPY deno.json deno.lock package.json ./
RUN deno install --frozen

COPY . .
RUN deno task --frozen build

FROM denoland/deno:2.7.14 AS runtime

ENV PORT=3000

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY server.ts ./server.ts

USER deno

EXPOSE 3000

CMD ["run", "--allow-env=PORT", "--allow-net", "--allow-read=dist", "server.ts"]
