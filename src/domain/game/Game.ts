import { Property } from "@tsed/schema";

export class Game {
  @Property()
  appID: string;

  @Property()
  name: string;

  @Property()
  logo: string;

  @Property()
  hoursLast2Weeks: string;

  @Property()
  hoursOnRecord: string;
}
