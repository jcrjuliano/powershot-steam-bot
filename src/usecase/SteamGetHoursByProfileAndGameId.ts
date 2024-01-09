import { Game } from "@src/domain/game/Game";
import { GetSteamDataByIdGateway } from "../gateway/steam/GetSteamDataByIdGateway";
import { GetSteamDataByProfileGateway } from "../gateway/steam/GetSteamDataByProfileGateway";

import { GetSteamDataInterface } from "../gateway/steam/GetSteamDataInterface";
import { Inject, Service } from "@tsed/di";
import { ProfileAndGameList } from "@src/domain/steam/ProfileAndGameList";

@Service()
export class SteamGetHoursByProfileAndGameId {
  @Inject()
  private getSteamDataByIdGateway: GetSteamDataByIdGateway;

  @Inject()
  private getSteamDataByProfileGateway: GetSteamDataByProfileGateway;

  public async execute(profileId: string, gameName: string): Promise<string> {
    const steamData =
      await this.streamDataByProfileId(profileId).execute(profileId);

    this.validateStreamData(steamData);

    const filteredGames = steamData.gameList.filter(
      this.filterGameFn(gameName),
    );

    const returnMessage = filteredGames.map(
      (game) => `${game.hoursOnRecord[0]} horas de: ${game.name}`,
    );

    if (returnMessage)
      return `${steamData.steamId} possui: ${returnMessage.join(". ")}!`;

    throw new Error(`Invalid game id or name: ${gameName} .`);
  }

  private streamDataByProfileId(profileId: string): GetSteamDataInterface {
    const gatewayList = [
      this.getSteamDataByIdGateway,
      this.getSteamDataByProfileGateway,
    ];

    const executeGateway = gatewayList.find((gateway) =>
      gateway.verify(profileId),
    );

    if (executeGateway) return executeGateway;

    throw new Error(`Not found strategy for validating steamId: ${profileId}`);
  }

  private validateStreamData(streamData: ProfileAndGameList): void {
    if (streamData.gameList === undefined)
      throw new Error(
        `Can't access game list with steam id: ${streamData.steamId}. Make sure the game list is public and try again.`,
      );
  }

  private filterGameFn(gameName: string) {
    if (isNaN(Number(gameName)))
      return (game: Game) =>
        game.name[0].toLowerCase().includes(gameName.toLowerCase()) &&
        game["hoursOnRecord"] !== undefined;
    return (game: Game) =>
      game.appID[0] === gameName && game["hoursOnRecord"] !== undefined;
  }
}
