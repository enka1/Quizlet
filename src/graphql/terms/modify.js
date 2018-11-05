import { FlashCard } from '../../models'

const updateTermModify = async (args, updateTerm) => {
    let { removeFlashCards, newFlashCards, termID, name, password } = args
    if (newFlashCards) {
        newFlashCards = newFlashCards.map(flashCard => {
            return {
                term: termID,
                ...flashCard
            }
        })
        newFlashCards = await FlashCard.insertMany(newFlashCards)
        updateTerm = {
            ...updateTerm,
            flashCards: [...updateTerm.flashCards, ...newFlashCards.map(flashCard => {
                return flashCard._id
            })]
        }
    }
    if (removeFlashCards) {
        await FlashCard.deleteMany({
            term: termID,
            _id: { $in: removeFlashCards }
        }).lean()

        updateTerm = {
            ...updateTerm,
            flashCards: updateTerm.flashCards.filter(flashCard => !removeFlashCards.includes(flashCard.toString()))
        }
    }
    if (name)
        updateTerm = {
            ...updateTerm,
            name
        }
    if (password)
        updateTerm = {
            ...updateTerm,
            password
        }
    return updateTerm
}

export { updateTermModify }