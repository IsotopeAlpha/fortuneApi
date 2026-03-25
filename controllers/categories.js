import Categories from "../models/Categories.js";

export const createCategory = async (req, res, next) => {
  const newCategory = new Categories(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json({
      status: "success",
      message: `Category created successfully.`,
      data: savedCategory,
    });
  } catch (err) {
    next(err);
  }
};


export const deleteCategory = async (req, res, next) => {
  const CategoryId = req.params.id;
    try {
      await Categories.findByIdAndDelete(CategoryId);
      res.status(200).json({
        status: "success",
        message: "Category has been deleted successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
};

export const getCategory = async (req, res, next) => {
  try {
    const Category = await Categories.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Category retrieved Successfully",
      data: Category,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await (await Categories.find()).reverse();
    res.status(200).json({
      status: "success",
      message: "Categories retrieved successfully",
      data: categories,
    });
  } catch (err) {
    next(err);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      msg: "Category Updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    next(err);
  }
};
