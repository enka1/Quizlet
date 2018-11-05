import { Term } from '../../models'
import { termCreatorIdentification } from '../../middleware/terms'
import { updateTermModify } from './modify'
export const Query = {
    async term(_, { id }) {
        let data = await Term.findOne({ _id: id }).populate('flashCards')
        return data
    },
    terms() {
        return null
    }
}

export const Mutation = {
    async createNewTerm(_, { term }) {
        return await Term.create(term)
    },
    async updateTerm(_, args) {
        let updateTerm = await termCreatorIdentification(args)
        updateTerm = await updateTermModify(args, updateTerm)
        return await Term.findOneAndUpdate({ _id: updateTerm._id }, updateTerm, { new: true }).populate('flashCards').lean()
    },
    async deleteTerm(_, args) {
        await termCreatorIdentification(args)
        return null
    }

}