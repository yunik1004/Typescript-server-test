import { isUndefined, isString, isNumber } from 'util'
import Router from 'koa-router'
import { Player, PlayerList } from '../model/player'
import { Room, RoomList } from '../model/room'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'hello world!'
})

/* Player list */
router.get('/player', async (ctx) => {
  ctx.response.body = PlayerList
})

/* Player creation */
router.post('/player', async (ctx) => {
  if (ctx.request.type !== 'application/json' || !ctx.request.body.hasOwnProperty('name')) {
    return
  }

  const playerName: string = ctx.request.body.name
  if (!isString(playerName)) {
    return
  }

  const player = new Player(playerName)
  PlayerList.push(player)

  ctx.response.body = player.id.toString()
})

/* Room list */
router.get('/room', async (ctx) => {
  ctx.response.body = RoomList
})

/* Room creation */
router.post('/room', async (ctx) => {
  if (ctx.request.type !== 'application/json' || !ctx.request.body.hasOwnProperty('name')) {
    return
  }

  const roomName: string = ctx.request.body.name
  if (!isString(roomName)) {
    return
  }

  const room = new Room(roomName)
  RoomList.push(room)

  ctx.response.body = room.id.toString()
})

/* Room join */
router.put('/room/:id', async (ctx) => {
  if (ctx.request.type !== 'application/json' || !ctx.request.body.hasOwnProperty('playerId')) {
    return
  }

  const playerId: number = ctx.request.body.playerId
  if (!isNumber(playerId)) {
    return
  }

  const player = PlayerList.find(x => x.id === playerId)
  if (isUndefined(player)) {
    return
  }

  const roomId: number = Number(ctx.params.id)
  if (isNaN(roomId)) {
    return
  }

  const room = RoomList.find(x => x.id === roomId)
  if (isUndefined(room)) {
    return
  }

  let res: boolean = room.join(player)
  if (!res) {
    return
  }

  ctx.response.body = 'wonderful'
})

export default router
