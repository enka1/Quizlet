import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { FlashCard } from './'

const StudySetSchema = new mongoose.Schema({
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
    }]
})

StudySetSchema.virtual('totalTerms').get(function() {
    return this.flashCards.length
})

StudySetSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        let salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

StudySetSchema.pre('remove', function(next) {
    FlashCard.deleteMany({
        studySet: {
            $eq: this._id
        }
    })
    next()
})

export default mongoose.model('StudySet', StudySetSchema)