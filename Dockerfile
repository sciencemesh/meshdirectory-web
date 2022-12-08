FROM node:16 as dependencies
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

FROM node:16 as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN yarn run build

FROM node:16 as runner
WORKDIR /app
ENV NODE_ENV production
ENV IOP_HOST iop-gateway:19000
ENV LOCATIONS_API https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
EXPOSE 3000

CMD ["yarn", "run", "start"]
