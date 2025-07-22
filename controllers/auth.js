import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "fortunesales111@gmail.com",
    pass: "foey rpbd wrti lexh",
  },
});

const saltRounds = 10;

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({ ...req.body, password: hash });

    await newUser.save();
    res
      .status(200)
      .json({ status: "success", message: "User Created Successfully", data: newUser });
    await transporter.sendMail(
      {
        from: '"Fortune Sales" <fortunesales111@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome", // Subject line
        text: "Hi, Fortunate User!",
        html: `Hi ${req.body.name}, Welcome to Fortune Sales. This message is to you have successfully registered at Fortune Sales. We hope you have an amazing time with us. Be fortunate while shopping.`, // plain text body
      },
      (error, info) => {
        if (error) {
          console.log(error)
        }
      }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(req.params.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { password: { hash } },
      { new: true }
    );
    res
      .status(200)
      .json({
        status: "success",
        message: "Password Changed Successfully",
        data: updatedUser,
      });
  } catch (error) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.json({
        status: "error",
        message: "User not Found!",
        data: res.data,
      });

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return res.json({
        status: "error",
        message: "Password/Email Doesn't Match",
      });

    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
        isHostelManager: user.isHostelManager,
      },
      process.env.JWT
    );

    const { password, isAdmin, isHostelManager, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        message: "User Login Successful",
        data: { ...otherDetails, token },
        isAdmin,
      });
  } catch (error) {
    next(error);
  }
};

