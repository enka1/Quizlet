import mongoose from 'mongoose'

const FlashCardSchema = new mongoose.Schema({
    studySet: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'StudySet'
    },
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    }
})

export default mongoose.model('FlashCard', FlashCardSchema)