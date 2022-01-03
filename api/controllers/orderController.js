import Order from "../models/OrderModel";

// Fetch user orders
export const fetchUserOrders = async (req, res) => {
	const { userId } = req.params;

	try {
		const orders = Order.find({ userId: userId });
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch all orders
export const fetchAllOrders = async (req, res) => {
	try {
		const orders = await Order.find();
		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Create order
export const createOrder = async (req, res) => {
	const order = new Order(req.body);
	try {
		const savedOrder = await order.save();
		res.status(201).json(savedOrder);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Update order
export const updateOrder = async (req, res) => {
	const { id } = req.params;
	try {
		const updatedOrder = await Order.findByIdAndUpdate(
			id,
			{ $set: req.body },
			{ new: true }
		);
		res.status(200).json(updatedOrder);
	} catch (error) {
		res.status(500).json(error);
	}
};

//  Delete order
export const deleteOrder = async (req, res) => {
	const { id } = req.params;
	try {
		await Order.findByIdAndDelete(id);
		res.status(200).json("Order deleted");
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch income
export const fetchIncome = async (req, res) => {
	const date = new Date();
	const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
	const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

	try {
		const income = await Order.aggregate([
			{ $match: { createdAt: { $gte: previousMonth } } },
			{
				$project: { month: { $month: "createdAt" } },
				sales: $amount,
			},
			{
				$group: {
					_id: "$month",
					total: { $sum: "$sales" },
				},
			},
		]);
		res.status(200).json(income);
	} catch (error) {
		res.status(500).json(error);
	}
};
