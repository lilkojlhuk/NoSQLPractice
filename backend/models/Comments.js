import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
    {
        comment: { type: String, required: true },
        author: { type: String, required: true },
    },
    { timestamps: true },
)
export default mongoose.model('Comment', CommentSchema)