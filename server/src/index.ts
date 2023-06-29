import express from 'express'
import {graphqlHTTP} from 'express-graphql'
import {buildSchema} from 'graphql'
import {readFileSync} from 'fs'
import cors from 'cors'
import boardQueries from "./controllers/board-queries";
import itemMutations from "./controllers/item-mutations";
import itemUpdates from "./controllers/item-updates";

const schema = buildSchema(readFileSync('./schema.graphql', 'utf-8'))

const root = {
    ...boardQueries,
    ...itemMutations,
    ...itemUpdates
}

const app = express()

//TODO: remove cors?
app.use(cors())

app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    })
)

app.listen(4000, () => console.log('Server Started 🔥\nBrowse http://localhost:4000/graphql'))