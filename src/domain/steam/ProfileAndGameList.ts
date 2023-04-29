import { CollectionOf, Nullable, Property } from "@tsed/schema"
import { Game } from "../game/Game"

export class ProfileAndGameList {
    @Property()
    @Nullable(String)
    steamID64?: string | null
    
    @Property()
    steamId: string

    @Property()
    @CollectionOf(Game)
    gameList: Game[]
}