import User from '../models/User.js'

export const createUser = async (userData) => {
    try {
        const user = new User(userData)

        return await user.save()
    } catch (error) {
        throw error
    }
}

export const findUserByUsername = async (username) => {
    try {
        return await User.findOne({ username })
    } catch (error) {
        throw error
    }
}

export const findUserById = async (userId) => {
    try {
        return await User.findById(userId)
    } catch (error) {
        throw error
    }
}
