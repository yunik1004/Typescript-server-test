import { isUndefined, isString, isNumber } from 'util'
import { gql } from 'apollo-server-koa'
import { Player, PlayerList } from '../model/player'
import { Room, RoomList } from '../model/room'

const typeDefs = gql`
  type Player {
    id: Int!
    name: String!
  }

  type Room {
    id: Int!
    name: String!
    players: [Player]!
  }

  type Query {
    player(id: Int): Player
    players: [Player]!
    room(id: Int): Room
    rooms: [Room]!
  }
`

const resolvers = {
  Query: {
    player: (_: any, args: { id: number } | any) => {
      const player = PlayerList.find(x => x.id === args.id)
      if (isUndefined(player)) {
        return null
      }
      return player
    },
    players: () => {
      return PlayerList
    },
    room: (_: any, args: { id: number } | any) => {
      const room = RoomList.find(x => x.id === args.id)
      if (isUndefined(room)) {
        return
      }
      return room
    },
    rooms: () => {
      return RoomList
    }
  }
}

export { typeDefs, resolvers }
