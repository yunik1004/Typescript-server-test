class Player {
  static numPlayer: number = 0

  readonly id: number
  readonly name: string

  constructor (name: string) {
    this.id = Player.numPlayer++
    this.name = name
  }
}

const PlayerList: Array<Player> = new Array(0)

export { Player, PlayerList }
