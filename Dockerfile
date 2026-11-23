FROM node:24-alpine3.23 AS base
WORKDIR /app

# https://zenn.dev/hirohokke/scraps/3d3c44b8d47c49 
RUN ln -s /usr/lib/libssl.so.3 /lib/libssl.so.3

FROM base AS build-api

COPY ./package*.json ./
COPY ./packages/api ./packages/api
COPY ./packages/database ./packages/database
COPY ./packages/database/.env_template ./packages/database/.env

RUN npm ci
RUN npm -w database run migrate && npm -w database run seed

FROM base AS build-web

COPY ./package*.json ./
COPY ./packages/api ./packages/api
COPY ./packages/web ./packages/web

RUN npm ci
RUN npm -w web run build

FROM nginx:stable-alpine AS runtime-web

COPY --from=build-web --chown=nonroot:nonroot /app/packages/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

FROM node:24-alpine3.23 AS runtime-api

COPY --from=build-api --chown=nonroot:nonroot /app/node_modules /app/node_modules
COPY --from=build-api --chown=nonroot:nonroot /app/package.json /app/package.json
COPY --from=build-api --chown=nonroot:nonroot /app/packages/api /app/packages/api
COPY --from=build-api --chown=nonroot:nonroot /app/packages/database/package.json /app/packages/database/package.json
COPY --from=build-api --chown=nonroot:nonroot /app/packages/database/generated /app/packages/database/generated
COPY --from=build-api --chown=nonroot:nonroot /app/packages/database/prisma /app/packages/database/prisma
COPY --from=build-api --chown=nonroot:nonroot /app/packages/database/.env /app/packages/database/.env

WORKDIR /app

EXPOSE 5000
CMD ["sh", "-c", "npm -w database exec prisma migrate deploy && npm -w api run dev"]

