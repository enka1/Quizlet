import Scalar from './scalar/resolve'
import { Query as StudySetQuery, Mutation as StudySetMutation } from './studySets/resolve'
import { Query as UserQuery, Mutation as UserMutation } from './users/resolve'

export default {
    ...Scalar,
    Query: {
        ...UserQuery,
        ...StudySetQuery
    },
    Mutation: {
        ...StudySetMutation,
        ...UserMutation
    }
}