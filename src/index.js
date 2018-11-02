import express from 'express'
import graphQLServer from 'express-graphql'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'

import schema from 'graphql'
import { connectToMongoDB } from './models'

connectToMongoDB()

const app = express()

app.use(helmet())
app.use(compression())
app.use(morgan())
app.use('/graphql', graphQLServer({
    schema,
    graphiql: true,
    pretty: true
}))

app.listen(process.env.PORT, (err) => {
    err ? console.log(err) : console.log(`Server is opening at port ${process.env.PORT} 🍭 🍭 🍭 `)
})