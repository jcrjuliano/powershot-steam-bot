import loggerConfig from "./logger/index";
import { join } from "path";
import { Configuration } from "@tsed/common";

const { version } = require('../../package.json')
export const rootDir = join(__dirname, '..')

export const config: Partial<Configuration> = {
  version,
  rootDir,
  logger: loggerConfig,
  client: {
    steam: {
      baseUrl: process.env.STEAM_BASE_URL || "https://steamcommunity.com",
      idLength: process.env.STEAM_ID_LENGTH || 17,
    }
  }
};
