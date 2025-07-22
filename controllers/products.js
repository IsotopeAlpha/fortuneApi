import Products from "../models/Products.js";
import cloudinary from "cloudinary";

cloudinary.v2.config({
    cloud_name: "dsybyyi1n",
    api_key: "728234898474631",
    api_secret: "Xh3iwcfo-HiJw7nY4ttrca-dZ1M",
    secure: true
  })

export const createProduct = async (req, res, next) => {
  const newProduct = new Products(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      status: "success",
      message: `Congratulations ${req.body.name}, you have sucessfully booked a room with Mola.`,
      data: savedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.productId;
  try {
    try {
      await Products.findByIdAndDelete(productId);
      res.status(200).json({
        status: "success",
        message: "Product has been deleted successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Product retrieved Successfully",
      data: product,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await (await Products.find()).reverse();
    res.status(200).json({
      status: "success",
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      msg: "Product Updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteCloudinaryPic = async (req, res, next) => {
  try {
    await cloudinary.v2.uploader.destroy(req.body.imageId);
    res
      .status(200)
      .json({
        status: "success",
        message: "Product Pic has been deleted successfully",
      });
  } catch (err) {
    next(err);
  }
};

export const uploadCloudinaryPic = async (req, res, next) => {
  try {
    var imageId;
    var imageUrl;
    await cloudinary.v2.uploader.upload(req.body.image).then((res) => {
      imageId = res.public_id;
      imageUrl = res.url;
    });
    res
      .status(200)
      .json({
        status: "success",
        message: "Product Pic has been uploaded successfully",
        data: { imageId: imageId, imageUrl: imageUrl },
      });
  } catch (err) {
    next(err);
  }
};