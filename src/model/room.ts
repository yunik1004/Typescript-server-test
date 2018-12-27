import { isUndefined } from 'util'
import { Player } from './player'

class Room {
  static numRoom: number = 0

  readonly id: number
  readonly name: string
  private players: Array<Player>

  constructor (name: string) {
    this.id = Room.numRoom++
    this.name = name
    this.players = new Array(0)
  }

  numPlayers (): number {
    return this.players.length
  }

  join (player: Player): boolean {
    if (!isUndefined(this.players.find(x => x.id === player.id))) {
      return false
    }

    this.players.push(player)
    return true
  }
}

const RoomList: Array<Room> = new Array(0)

export { Room, RoomList }
