import { ProfileAndGameList } from "@src/domain/steam/ProfileAndGameList";

export interface GetSteamDataInterface {
    verify(id: string): boolean;
    execute(id: string): Promise<ProfileAndGameList>;
}