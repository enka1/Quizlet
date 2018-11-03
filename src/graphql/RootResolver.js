import Scalar from './scalar/resolve'
import { Query as TermQuery, Mutation as TermMutation } from './terms/resolve'
import { Query as UserQuery, Mutation as UserMutation } from './users/resolve'

export default {
    ...Scalar,
    Query: {
        ...UserQuery,
        ...TermQuery
    },
    Mutation: {
        ...TermMutation,
        ...UserMutation
    }
}