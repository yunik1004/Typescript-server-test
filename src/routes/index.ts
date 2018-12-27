import Router from 'koa-router'
import { Room, RoomList } from '../model/room'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'hello world!'
})

router.get('/room', async (ctx) => {
  ctx.body = RoomList
})

router.post('/room/create', async (ctx) => {
  if (ctx.request.type !== 'application/json' || !ctx.request.body.hasOwnProperty('name')) {
    return
  }

  const room = new Room(ctx.request.body.name)
  RoomList.push(room)

  ctx.response.type = 'text/plain'
  ctx.response.body = room.id.toString()
})

export default router
