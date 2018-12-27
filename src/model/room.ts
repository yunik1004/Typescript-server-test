class Room {
  static numRoom: number = 0

  readonly id: number
  name: string
  players: Array<any>

  constructor (name: string) {
    this.id = Room.numRoom++
    this.name = name
    this.players = new Array(0)
  }
}

const RoomList: Array<Room> = new Array(0)

export { Room, RoomList }
