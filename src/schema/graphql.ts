import { isNull } from 'util'
import { gql } from 'apollo-server-koa'
import { PlayerList } from '../model/player'
import { RoomList } from '../model/room'

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
      return PlayerList.getPlayer(args.id)
    },
    players: () => {
      return PlayerList.getPlayers()
    },
    room: (_: any, args: { id: number } | any) => {
      return RoomList.getRoom(args.id)
    },
    rooms: () => {
      return RoomList.getRooms()
    }
  },
  Mutation: {
    createPlayer: (_: any, args: { name: string } | any) => {
      return PlayerList.addPlayer(args.name)
    },
    createRoom: (_: any, args: { name: string } | any) => {
      return RoomList.addRoom(args.name)
    },
    joinRoom: (_: any, args: { roomID: number, playerID: number } | any) => {
      const room = RoomList.getRoom(args.roomID)
      const player = PlayerList.getPlayer(args.playerID)
      if (isNull(room) || isNull(player)) {
        return false
      }
      return room.join(player)
    }
  }
}

export { typeDefs, resolvers }
