import User from "../models/User.js";
import bcrypt from "bcrypt";

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User has been deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "User Updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const encrptPass = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);
    res.status(200).json({ status: "ok", data: hash });
  } catch (error) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.find({
      email: { $regex: new RegExp(req.body.email, "i") },
    });
    if (!user) {
      res.json({ status: "error", message: "User not Found", data: null });
    }
    res
      .status(200)
      .json({ status: "success", message: "User Found", data: user });
  } catch (err) {
    next(err);
  }
};
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User Loaded Successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
