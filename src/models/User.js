import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { StudySet } from './'

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
    birthday: {
        type: Date
    }
})

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(10)
        this.password = bcrypt.hash(this.password, salt)
    }
    next()
})

UserSchema.pre('remove', function(next) {
    StudySet.deleteMany({
        creator: {
            $eq: this._id
        }
    })
    next()
})

UserSchema.methods.generateToken = function() {
    return jwt.sign({ _id: this._id }, process.env.BCRYPT_SECRET)
}

UserSchema.methods.isAuthenticate = function(token) {
    return jwt.verify(token, process.env.BCRYPT_SECRET, (err, decoded) => {
        if (err) {
            return Promise.reject()
        }
        return Promise.resolve(decoded)
    })
}

export default mongoose.model('User', UserSchema)