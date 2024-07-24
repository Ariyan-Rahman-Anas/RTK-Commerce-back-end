const ProductsModel = require("./../model/ProductsModel")


module.exports.get_products = async (req, res) => {
  try {
    const { page = 1, limit = 8 } = req.query;
    const data = await ProductsModel.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await ProductsModel.countDocuments();

    res.status(200).json({
      totalData: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data,
    });
  } catch (error) {
    console.error("An error occurred while fetching products data: ", error);
    res
      .status(500)
      .json({ error: "Internal server error. Please try again later." });
  }
};


module.exports.get_productById = async (req, res) => {
  const id = req.params.id
  try {
    const data = await ProductsModel.findById(id)
    if (data) {
      return res.status(200).json({ data });
    }
    return res.status(400).json({message: "Product not found with this id"})
  } catch (error) {
    res.status(400).json({ error: "Invalid product id", error });
  }
}