import { isEmail } from 'validator'

import { User } from '../../models'

export default async (user) => {
    let { username, email, password } = user
    if (!username)
        throw Error("Username is required !")
    if (username.includes(" "))
        throw Error("Username mustn't contain any white space")
    else if (await User.findOne({ username }))
        throw Error("Username is already exist !")
    if (!password)
        throw Error("Password is required !")
    else if (password.length < 6)
        throw Error("Password must be at least 6 characters !")
    else if (!/[a-z]/.test(password))
        throw Error("Password must have at least one lowercase alphabet !")
    else if (!/[A-Z]/.test(password))
        throw Error("Password must have at least one uppercase alphabet !")
    else if (!/[0-9]/.test(password))
        throw Error("Password must have one digit !")
    if (!email)
        throw Error("Email is required !")
    else if (!isEmail(email))
        throw Error("Not a valid email !")
}