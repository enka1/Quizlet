import gql from 'graphql-tag'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { connectToMongoDB, closeConnectToMongoDB, dropCollection } from '../MongoDBEnviroment'
import { getEnvironmentParameter } from '../Environment'
import { Test } from '../Test';
import { User } from '../../src/models'

let variables = {
    user: {
        username: "marumi",
        password: "Marumi123",
        email: "nhithanh123vnn@gmail.com"
    }
}
let query = gql `
mutation($user: UserInput) {
  signUp(user: $user) {
    _id
    token
  }
}
`

beforeAll(() => {
    getEnvironmentParameter()
    connectToMongoDB()
    dropCollection('users')
})
afterAll(() => {
    closeConnectToMongoDB()
})

describe('Sign Up GraphQL Test:', async () => {
    let testToken, testID
    beforeAll(async () => {
        let { data: { signUp: { token, _id } } } = await new Test(query, variables).executeQuery()
        testToken = token
        testID = _id
    })
    test('It should return valid token when register.', async () => {
        let decoded = jwt.verify(testToken, process.env.JWT_SECRET)
        expect(decoded._id).toBe(testID)
    })

    test('Password should be hash when save to database.', async () => {
        let { password } = await User.findById(testID)
        let isMatch = await bcrypt.compare('Marumi123', password)
        expect(isMatch).toBe(true)
    })
})