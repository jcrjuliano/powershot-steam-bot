import { Game } from "@src/domain/game/Game";
import { ProfileAndGameList } from "@src/domain/steam/ProfileAndGameList";
import { Service, Value } from "@tsed/di"
import axios from "axios";
import xml2js from 'xml2js';


@Service()
export class GetSteamDataByProfileId {
    @Value("client.steam.baseUrl")
    private steamClientUrl: string

    public async execute(profileId: string): Promise<ProfileAndGameList> {
        const response = await axios.get(`${this.steamClientUrl}/profiles/${profileId}/games?xml=1`);
        const xml = response.data;
        const xmlObject = await xml2js.parseStringPromise(xml);

        const games: Game[] = xmlObject.gamesList.games[0].game;

        return { 
            steamID64: xmlObject.gamesList.steamID64,
            steamId: xmlObject.gamesList.steamID[0],
            gameList: games 
        };
    }
        
}