import mongoose from 'mongoose'

export default () => {
    let url = "mongodb://localhost:27017/Quizlet"
    mongoose.connect(url, { useNewUrlParser: true }).catch(err => {
        console.log(err)
        process.exit(0)
    })
    mongoose.set('debug', true)
}