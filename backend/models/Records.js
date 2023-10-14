import mongoose from 'mongoose'

const RecordsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        text: { type: String, required: true },
        answer: { type: String, default: "" },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true },
)
export default mongoose.model('Records', RecordsSchema)