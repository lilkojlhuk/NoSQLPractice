import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true, },
        password: { type: String, required: true, },
        role: { type: String, required: true, default: "USER" },
        posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Records', },],
    },
    { timestamps: true },
)

export default mongoose.model('User', UserSchema)