import { makeExecutableSchema } from 'graphql-tools'
import { importSchema } from 'import-graphql'
import path from 'path'

import resolvers from './RootResolver'

const typeDefs = importSchema(path.join(__dirname, 'TypeDefs.graphql'))

export default makeExecutableSchema({
    typeDefs,
    resolvers
})