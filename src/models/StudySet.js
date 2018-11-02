import mongoose from 'mongoose'
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
    flashCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FlashCard'
    }]
})

StudySetSchema.virtual('totalTerms').get(function() {
    return this.flashCards.length
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