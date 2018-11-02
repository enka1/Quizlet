import mongoose from 'mongoose'

export default () => {
    let url = ""
    mongoose.connect(url, {
        useNewUrlParser: true
    }).catch(err => {
        console.log(err)
        process.exit(0)
    })
}