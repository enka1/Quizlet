import { execute } from 'graphql'

import schema from '../graphql'

export class Test {
    constructor(query, variables, rootValue, contextValue) {
        this.query = query
        this.variables = variables
        this.rootValue = rootValue
        this.contextValue = contextValue
    }
    executeQuery() {
        return execute(schema, this.query, this.rootValue, this.contextValue, this.variables)
    }
}