import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { ApolloServer } from 'apollo-server-koa'
import router from './routes/index'
import { typeDefs, resolvers } from './schema/graphql'

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

const apolloServer = new ApolloServer({ typeDefs, resolvers })
apolloServer.applyMiddleware({ app })

const server = require('http').createServer(app.callback())
const io = require('socket.io')(server)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log('Server is listening to port ' + PORT)
})
