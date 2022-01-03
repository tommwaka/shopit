import Cart from "../models/CartModel.js";

// Fetch user cart
export const fetchUserCart = async (req, res) => {
	const { userId } = req.params;
	try {
		const cart = await Cart.findOne({ userId: userId });
		res.status(200).json(cart);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch all
export const fetchAllCart = async (req, res) => {
	try {
		const carts = await Cart.find();
		res.status(200).json(carts);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Create cart
export const createCart = async (req, res) => {
	const cart = new Cart(req.body);
	try {
		const savedCart = cart.save();
		res.status(201).json(savedCart);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Update cart
export const updateCart = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedCart = Cart.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedCart);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Clear cart
export const clearCart = async (req, res) => {
	try {
		await Cart.findByIdAndDelete(id);
		res.status(200).json("Cart cleared");
	} catch (error) {
		res.status(500).json(error);
	}
};
