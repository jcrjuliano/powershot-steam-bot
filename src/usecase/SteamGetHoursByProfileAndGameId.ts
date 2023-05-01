import { GetSteamDataByIdGateway } from "../gateway/steam/GetSteamDataByIdGateway";
import { GetSteamDataByProfileGateway } from "../gateway/steam/GetSteamDataByProfileGateway";
import { Inject, Service } from "@tsed/di";

@Service()
export class SteamGetHoursByProfileAndGameId {
    
    @Inject()
    private getSteamDataByIdGateway: GetSteamDataByIdGateway

    @Inject()
    private getSteamDataByProfileGateway: GetSteamDataByProfileGateway
    
    public async execute(profileId: string, gameName: string): Promise<string> {
        const gatewayList = [this.getSteamDataByIdGateway, this.getSteamDataByProfileGateway]
        const executeGateway = gatewayList.find(gateway => gateway.verify(profileId))
        const steamData = executeGateway ? await executeGateway.execute(profileId) : (() => { throw new Error(`Not found strategy for validating steamId: ${profileId}`); })();
        if (steamData.gameList === undefined) {
            throw new Error(`Can't access game list with steam id: ${profileId}. Make sure the game list is public and try again.`)
        }
        const filteredGames = isNaN(Number(gameName)) ?
            steamData.gameList.filter(game => game.name[0].toLowerCase().includes(gameName.toLowerCase()) && game['hoursOnRecord'] !== undefined) : 
            steamData.gameList.filter(game => game.appID[0] === gameName && game['hoursOnRecord'] !== undefined);    
        if (filteredGames.length === 0) {
            throw new Error(`Invalid game id or name: ${gameName} .`);
        }

        const returnMessage = filteredGames.map(game => `${game.hoursOnRecord[0]} horas de: ${game.name}`)

        return `${steamData.steamId} possui: ${returnMessage.join(". ")}!`
    }
}