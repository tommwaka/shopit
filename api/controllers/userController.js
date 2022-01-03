import cryptoJs from 'crypto-js'
import User from '../models/UserModel.js'

// Fetch a single user
export const fetchUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
         // Don't return the password when returning user details
        const {password, ...others} = user._doc
        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Fetch all users
export const fetchAllUsers = async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Update user
export const updateUser = async (req, res) => {
	const { id } = req.params
	if (req.body.password) {
		req.body.password = cryptoJs.AES.encrypt(
			password,
			process.env.HASH_SECRET
		).toString();
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true }
		); /* Make it return the updated user */
		res.status(2000).json(updatedUser);
	} catch (error) {
		res.status(500).json(error);
	}
};

// Delete user
export const deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		await User.findByIdAndDelete(id);
		res.status(200).json("User deleted");
	} catch (error) {
		res.status(500).json(error);
	}
};

// Fetch stats
export const fetchStats = async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            {
                $group: {
                    _id: '$month',
                    total: { $sum: 1}
                }
            }
        ])
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
}