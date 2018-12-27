import { isUndefined } from 'util'
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

  type Mutation {
    createPlayer(name: String): Player!
    createRoom(name: String): Room!
    joinRoom(roomID: Int, playerID: Int): Boolean
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
  },
  Mutation: {
    createPlayer: (_: any, args: { name: string } | any) => {
      const player = new Player(args.name)
      PlayerList.push(player)
      return player
    },
    createRoom: (_: any, args: { name: string } | any) => {
      const room = new Room(args.name)
      RoomList.push(room)
      return room
    },
    joinRoom: (_: any, args: { roomID: number, playerID: number } | any) => {
      const room = RoomList.find(x => x.id === args.roomID)
      const player = PlayerList.find(x => x.id === args.playerID)
      if (isUndefined(room) || isUndefined(player)) {
        return false
      }
      return room.join(player)
    }
  }
}

export { typeDefs, resolvers }
