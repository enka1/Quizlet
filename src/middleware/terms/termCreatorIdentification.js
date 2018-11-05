import { Term } from '../../models'
import { tokenAuthenticate } from '../authentication'

export default async (args) => {
    let { termID, token } = args
    if (!token)
        throw Error('Token is required !')
    if (!termID)
        throw Error('TermID is required !')
    let term = await Term.findOne({ _id: termID }).lean()
    if (!term) {
        throw Error("The term doesn't exist !")
    }
    let author = tokenAuthenticate(token)
    if (author._id.toString() !== term.creator.toString())
        throw Error("Not authorized to update this term !")
    return term
}