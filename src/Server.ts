import { Inject } from "@tsed/di";
import { PlatformApplication, Configuration } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import "@tsed/ajv";
import { config, rootDir } from "./config";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import compress from "compression";
import "@tsed/swagger";
@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 9020,
  httpsPort: false,
  mount: {
    "/": [`${rootDir}/controllers/**/*.ts`],
  },
  swagger: [
    {
      path: "/v2/docs",
      specVersion: "2.0",
    },
    {
      path: "/v3/docs",
      specVersion: "3.0.1",
    },
  ],
  exclude: ["**/*.spec.ts"],
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress())
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({ extended: true }));
  }
}
