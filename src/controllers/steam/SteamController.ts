import { SteamGetHoursByProfileAndGameId } from '@src/usecase/SteamGetHoursByProfileAndGameId';
import { Controller, Inject } from '@tsed/di';
import { NotFound } from '@tsed/exceptions';
import { PathParams } from '@tsed/platform-params';
import { Get, Name, Returns } from '@tsed/schema';

@Controller('/steam')
@Name("steam controller")
export class SteamController {
  @Inject()
  private steamGetHoursByProfileAndGameId: SteamGetHoursByProfileAndGameId

  @Get('/:steamId/game/:gameId')
  @Returns(200, String)
  @Returns(404, NotFound)
  async getHoursOnRecord(@PathParams('steamId') steamId: string, @PathParams('gameId') gameId: string): Promise<string> {
    return this.steamGetHoursByProfileAndGameId.execute(steamId, gameId)
  }
}