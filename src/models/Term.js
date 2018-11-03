import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { FlashCard } from '.'

const TermSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    flashCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashCard'
    }],
    createdAt: {
        type: Date
    }
})

TermSchema.virtual('totalFashCards').get(function() {
    return this.flashCards.length
})

TermSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

TermSchema.pre('remove', function(next) {
    FlashCard.deleteMany({
        term: {
            $eq: this._id
        }
    })
    next()
})

export default mongoose.model('Term', TermSchema)