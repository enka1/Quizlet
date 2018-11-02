import { GraphQLScalarType } from 'graphql'
import { GraphQLDateTime } from 'graphql-iso-date'

export default {
    DateTime: GraphQLDateTime,
    MongoID: new GraphQLScalarType({
        name: 'MongoID',
        serialize: (value) => {
            return value.toString()
        }
    })
}