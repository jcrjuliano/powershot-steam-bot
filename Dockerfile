###############################################################################
###############################################################################
##                      _______ _____ ______ _____                           ##
##                     |__   __/ ____|  ____|  __ \                          ##
##                        | | | (___ | |__  | |  | |                         ##
##                        | |  \___ \|  __| | |  | |                         ##
##                        | |  ____) | |____| |__| |                         ##
##                        |_| |_____/|______|_____/                          ##
##                                                                           ##
## description     : Dockerfile for TsED Application                         ##
## author          : TsED team                                               ##
## date            : 2022-03-05                                              ##
## version         : 2.0                                                     ##
##                                                                           ##
###############################################################################
###############################################################################
# ARG NODE_VERSION=16.14

# FROM node:${NODE_VERSION}-alpine as build

# WORKDIR /opt

# COPY package.json yarn.lock tsconfig.json tsconfig.compile.json ./

# RUN yarn install --pure-lockfile

# COPY ./src ./src

# RUN yarn build

# FROM node:${NODE_VERSION}-alpine as runtime

# WORKDIR /opt/app

# RUN chown node:node -R /opt/app

# USER node

# COPY --from=build /opt/package.json /opt/yarn.lock /opt/tsconfig.json /opt/tsconfig.compile.json /opt/src ./ 

# COPY --from=build /opt/dist ./dist

# RUN yarn install --production --pure-lockfile

# COPY processes.config.js .

# EXPOSE 8081
# ENV PORT 8081
# ENV NODE_ENV production

# CMD ["pm2-runtime", "start", "processes.config.js", "--env", "production"]
FROM node:16.14-alpine
WORKDIR /app
COPY . .
RUN ["yarn"]
CMD ["node", "src/index.js"]
EXPOSE 9020
ENV PORT 9020
CMD ["yarn", "start"]