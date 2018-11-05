import mongoose from 'mongoose'

const connectToMongoDB = () => {
    let url = 'mongodb://localhost:27017/QuizletTest'
    mongoose.connect(url, { useNewUrlParser: true })
}

const closeConnectToMongoDB = () => {
    mongoose.connection.close()
}

const dropCollection = (collectionName) => {
    mongoose.connection.dropCollection(collectionName)
}

export { connectToMongoDB, closeConnectToMongoDB, dropCollection }