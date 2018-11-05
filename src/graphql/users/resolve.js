import { User } from '../../models'
import { signUpDataValidation } from '../../middleware/users'

function modifyUserCriteria(criteria) {
    let { username } = criteria
    let modifyUserCriteria = {}
    if (username)
        modifyUserCriteria = {
            ...modifyUserCriteria,
            username: new RegExp(username, 'i')
        }
    return modifyUserCriteria
}

export const Query = {
    async authUser(_, { user }) {
        let { token, username, password } = user
        if (token) {
            return await User.findByToken(token)
        }
        else if (username && password) {
            return await User.findByCredential(username, password)
        }
    },
    async user(_, { id }) {
        return await User.findById(id)
    },
    async users(_, { criteria }) {
        return await User.find(modifyUserCriteria(criteria))
    }
}

export const Mutation = {
    async signUp(_, { user }) {
        await signUpDataValidation(user)
        let newUser = await User.create(user)
        return {
            _id: newUser._id,
            token: newUser.generateToken()
        }
    }
}