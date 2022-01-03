import Product from "../models/ProductModel.js";

// Create a product
export const createProduct = async (req, res) => {
	const product = new Product(req.body);
	try {
		const savedProduct = await product.save();
		res.status(201).json(savedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch product
export const fetchProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const product = Product.findById(id);
		res.status(200).json(product);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch all products
export const fetchAllProducts = async (req, res) => {
	const qNew = req.query.new;
	const qCategory = req.query.category;
	try {
		let products;

		if (qNew) {
			products = await Product.find().sort({ createdAt: -1 }).limit(5);
		} else if (qCategory) {
			products = await Product.find({
				categories: {
					$in: [qCategory],
				},
			});
		} else {
			products = await Product.find();
		}
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Update product
export const updateProduct = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedProduct = await Product.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedProduct);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Delete product
export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json("Product deleted");
	} catch (error) {
		res.status(500).json(error);
	}
};
