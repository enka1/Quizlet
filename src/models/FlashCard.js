import mongoose from 'mongoose'

const FlashCardSchema = new mongoose.Schema({
    term: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Term'
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})

export default mongoose.model('FlashCard', FlashCardSchema)