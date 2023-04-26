import { Inject, Service } from "@tsed/di";
import { GetSteamDataByProfileId } from "./GetSteamDataByProfileId";

@Service()
export class SteamGetHoursByProfileAndGameId {
    
    @Inject()
    private getSteamDataByProfileId: GetSteamDataByProfileId
    
    public async execute(profileId: string, gameName: string): Promise<string> {
        const steamData = await this.getSteamDataByProfileId.execute(profileId);
        const filteredGames = steamData.gameList.filter(game => game.name[0].indexOf(gameName) >= 0).length > 0 ?
            steamData.gameList.filter(game => game.name[0].indexOf(gameName) >= 0) : 
            steamData.gameList.filter(game => game.appID[0] === gameName);

        if (filteredGames.length === 0) {
            throw new Error(`Game with gameName ${gameName} not found for steamId ${profileId}`);
        }

        const game = filteredGames[0];
        return `${steamData.steamId} possui: ${game.hoursOnRecord[0]} horas de ${game.name}!`;
    }
}