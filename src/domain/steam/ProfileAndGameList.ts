import { CollectionOf, Property } from "@tsed/schema"
import { Game } from "../game/Game"

export class ProfileAndGameList {
    @Property()
    steamID64: string
    
    @Property()
    steamId: string

    @Property()
    @CollectionOf(Game)
    gameList: Game[]
}