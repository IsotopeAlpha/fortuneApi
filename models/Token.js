import mongoose from 'mongoose';

const TokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 86400000 } }
});
export default mongoose.model(
    "EmailToken", TokenSchema
)