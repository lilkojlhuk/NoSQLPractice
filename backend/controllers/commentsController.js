import { createComment, getAllComment } from '../dao/commentsDao.js'

export const createComments = async (req, res) => {
    try {
        const { comment } = req.body
        const username = req.user.username

        if (!comment) {
            return res.json({ message: 'Заповніть обов`язкові поля' })
        }

        const newCommentData = { comment, author: username }

        const newComment = await createComment(newCommentData)

        return res.json(newComment)
    } catch (error) {
        return res.json({ message: 'Невідома помилка при створенні коментаря' })
    }
}

export const getAllComments = async (req, res) => {
    try {
        const comments = await getAllComment()

        return res.json(comments)
    } catch (error) {
        return res.json({ message: 'Помилка при отриманні коментарів' })
    }
}