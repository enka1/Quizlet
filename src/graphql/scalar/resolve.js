import { GraphQLScalarType, Kind } from 'graphql'

export default {
    MongoID: new GraphQLScalarType({
        name: 'MongoID',
        serialize: (value) => {
            return value.toString()
        }
    }),
    TimeStamp: new GraphQLScalarType({
        name: 'Timestamp',
        serialize: (value) => {
            return value.toString()
        },
        parseLiteral(value) {
            if (typeof value === "number") {
                return value
            }
            throw new Error("Timestamp must be a number")
        },
        parseValue(value) {
            if (typeof value === "number") {
                return value
            }
            throw new Error("Timestamp must be a number")
        },
    })
}