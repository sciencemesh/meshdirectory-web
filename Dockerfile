FROM node:16

WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build

ENV IOP_GATEWAY revad:19000
ENV LOCATIONS_API https://iop.sciencemesh.uni-muenster.de/iop/mentix/loc

EXPOSE 19000

CMD ["yarn", "run", "dev"]
