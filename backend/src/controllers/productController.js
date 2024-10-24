import Product from '../models/Product.js'
import Order from '../models/Order.js'

// Add a new product
const addProduct = async (req, res) => {
  req.body.farmer = req.userId;
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product: product,
      message: "Product add Successfully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};

// Get all farmer products
const getProducts = async (req, res) => {
  const farmerId = req.userId;
  try {
    const products = await Product.find({ farmer: farmerId }).populate('farmer', 'email username')
    res.status(200).json({
      success: true,
      products: products,
      message: "Get all products"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const id = req.body.id;
  const updates = req.body;

  try {
    const product = await Product.findByIdAndUpdate(id, updates, { new: true });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found!"
      });
    }
    res.status(200).json({
      success: true,
      message: "Product Updated Successfully!"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Sever Error!"
    });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const id = req.body.id
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error!"
    });
  }
};



export { addProduct, getProducts, updateProduct, deleteProduct };