import Orders from "../models/Orders.js";
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

export const createOrder = async (req, res, next) => {
  const newOrder = new Orders(req.body);

  try {
    const savedOrder = await Orders.save();

    res.status(200).json({
      status: "success",
      message: `Congratulations ${req.body.name}, you have sucessfully ordered from Fortune Sales. Be rest assured, your order will be delivered soon. Please be with your phone.`,
      data: savedOrder,
    });
    await transporter.sendMail(
      {
        from: '"Fortune Sales" <fortunesales111@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Congratulations", // Subject line
        text: "Hi, Fortune Sales User!",
        html: `Congratulations ${req.body.name}. You have sucessfully ordered from Fortune Sales. Be rest assured, your order will be delivered soon. Please be with your phone. \n Your order is ${savedOrder}`, // plain text body
      },
      (error, info) => {
        if (error) {
          console.log(error);
        }
      }
    );
  } catch (err) {
    next(err);
  }
};

export const deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    await Orders.findByIdAndUpdate(orderId);
    res.status(200).json({
      status: "success",
      message: "Order has been deleted successfully",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const Order = await Orders.findById(req.params.id);
    res.status(200).json({
      status: "success",
      msg: "Order retrieved successfully",
      data: Order,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await (await Orders.find()).reverse();
    res.status(200).json({
      status: "success",
      message: "Orders retrieved successfully",
      data: orders,
    });
  } catch (err) {
    next(err);
  }
};

export const getOrderByEmail = async (req, res, next) => {
  try {
    const foundOrder = await Orders.find({
      email: { $regex: new RegExp(req.body.email, "i") },
    });
    res.status(200).json({
      status: "success",
      message: "Order retrieved successfully",
      data: foundOrder,
    });
  } catch (err) {
    next(err);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      msg: "Order Updated successfully",
      data: updatedOrder,
    });
  } catch (err) {
    next(err);
  }
};
