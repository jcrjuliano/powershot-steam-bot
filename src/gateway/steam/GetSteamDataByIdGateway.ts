import { Game } from "@src/domain/game/Game";
import { ProfileAndGameList } from "@src/domain/steam/ProfileAndGameList";
import { Injectable, Value } from "@tsed/di";
import axios from "axios";
import xml2js from 'xml2js';
import { GetSteamDataInterface } from "./GetSteamDataInterface";

@Injectable()
export class GetSteamDataByIdGateway implements GetSteamDataInterface {
    @Value("client.steam.baseUrl")
    private steamClientUrl: string

    @Value("client.steam.idLength")
    private steamIdLength: number
    
    public verify = (steamId: string) => 
        steamId.length !== this.steamIdLength && isNaN(Number(steamId))

    public async execute(steamId: string): Promise<ProfileAndGameList> {
        const response = await axios.get(`${this.steamClientUrl}/id/${steamId}/games?xml=1`);
        const xml = response.data;
        const xmlObject = await xml2js.parseStringPromise(xml);

        const games: Game[] = xmlObject.gamesList.games[0].game;

        return { 
            steamId: xmlObject.gamesList.steamID[0],
            gameList: games 
        };
    }

}