import jwt from 'jsonwebtoken'

export default (token) => {
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        return decoded
    }
    catch (error) {
        throw Error("Token is invalid !")
    }
}