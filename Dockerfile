FROM node:16.14-alpine as build
WORKDIR /app
# Copy package.json and install dependencies
COPY package.json .
RUN ["yarn", "install"]
# Copy the rest of the files and build
COPY . .
RUN ["yarn", "build"]


FROM node:16.14-alpine
WORKDIR /app
# Reduce image size by removing dev dependencies
COPY --from=build /app/package.json ./package.json
RUN ["yarn", "install", "--production"]
# Copy the built files
COPY --from=build /app/dist ./dist

EXPOSE 9020
CMD ["node", "./dist/index.js"]
