import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes/index'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const PORT = 8080

server.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
