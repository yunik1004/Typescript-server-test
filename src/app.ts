import Koa from 'koa'
import router from './routes/index'

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

server.listen(8080, () => {
  console.log('server is listening to port 8080')
})
