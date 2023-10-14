import Comments from '../models/Comments.js'

export const createComment = async (commentData) => {
    try {
        const comment = new Comments(commentData)

        return await comment.save()
    } catch (error) {
        throw error
    }
}

export const getAllComment = async () => {
    try {
        const comments = await Comments.find()

        return comments
    } catch (error) {
        throw error
    }
}