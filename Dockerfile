FROM --platform=$BUILDPLATFORM node:20.12.0-alpine3.19 AS base
ENV DIR /app
WORKDIR $DIR

# Development Mode
FROM base AS development
EXPOSE ${PORT}
COPY package.json package.json
RUN yarn install
CMD [ "yarn", "dev" ]

# Install development dependencies
FROM base AS dev-deps
COPY package.json package.json
RUN yarn install --frozen-lockfile

# Build the app
FROM base AS builder
COPY --from=dev-deps $DIR/node_modules ./node_modules
COPY . .
RUN yarn type-check && yarn test && yarn build

# Production app
FROM base AS production
EXPOSE ${PORT}
RUN apk add --no-cache libc6-compat
COPY --from=builder $DIR/public ./public
COPY --from=builder $DIR/dist/standalone ./
COPY --from=builder $DIR/dist/static ./dist/static
CMD HOSTNAME="0.0.0.0" node server.js
