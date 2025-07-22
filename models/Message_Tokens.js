import mongoose from 'mongoose';

const MessageTokensSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true
    },
}, { timestamps: true });

export default mongoose.model(
    "Message_Tokens", MessageTokensSchema
)