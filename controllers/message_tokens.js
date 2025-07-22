import Message_Tokens from "../models/Message_Tokens.js";


export const createMToken = async (req, res, next) => {
    const newMToken = new Message_Tokens(req.body)

    try {
        const saved = await newMToken.save();
        res.status(200).json({ status: "ok", msg: "Message Token created in hostel successfully", data: saved });
    } catch (err) {
        next(err)
    }
}

export const deleteMToken = async (req, res, next) => {
    try {
        await Message_Tokens.findByIdAndDelete(req.params.id);

        res.status(200).json({ status: "ok", msg: "MToken has been deleted successfully", data: res.data });
    } catch (err) {
        next(err);
    }
}

export const updateMToken = async (req, res, next) => {
    try {
        const updatedMToken = await Message_Tokens.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ status: "ok", msg: "MToken Updated successfully", data: updatedMToken });
    } catch (err) {
        next(err);
    }
}

export const getMToken = async (req, res, next) => {
    try {
        const MToken = await Message_Tokens.findById(req.params.id);
        res.status(200).json({ status: "ok", msg: 'MToken Loaded Successfully', data: MToken });
    } catch (err) {
        next(err);
    }
}

export const getMTokens = async (req, res, next) => {
    try {
        const MTokens = await Message_Tokens.find();
        res.status(200).json(MTokens);
    } catch (err) {
        next(err);
    }
}

export const getMTokenByEmail = async (req, res, next) => {
    try {
        const found = await Message_Tokens.find({ email: req.body.email });
        res.status(200).json(found);
    } catch (err) {
        next(err);
    }
}