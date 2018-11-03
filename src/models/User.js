import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { Term } from './'

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    birthday: {
        type: Date
    },
    terms: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Term'
    }],
    // studyActivities: [{

    // }]
})

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

UserSchema.pre('remove', function(next) {
    Term.deleteMany({
        creator: {
            $eq: this._id
        }
    })
    next()
})

UserSchema.methods.generateToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
}

UserSchema.statics.findByCredential = async function(username, password) {
    let user = await UserModel.findOne({ username })
    if (user)
        if (await bcrypt.compare(password, user.password))
            return {
                token: user.generateToken()
            }
    throw Error("Username or Password is incorrect !")
}

UserSchema.statics.findByToken = async function(token) {
    try {
        let { _id } = jwt.verify(token, process.env.JWT_SECRET)
        return await UserModel.findById(_id)
    }
    catch (error) {
        throw Error("Token is invalid !")
    }
}

UserSchema.methods.toJSON = function() {
    let { username, email, avatar, birthday } = this
    return { username, email, avatar, birthday }
}

const UserModel = mongoose.model('User', UserSchema)

export default UserModel