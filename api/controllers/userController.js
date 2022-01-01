import cryptoJs from 'crypto-js'
import User from '../models/UserModel.js'

// Update user
export const updateUser = async (req, res) => {
    const { id } = req.params
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(password, process.env.HASH_SECRET).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true })/*Make it return the updated user*/
        res.status(2000).json(updatedUser)
    } catch (error) {
        res.status(500).json(error)
    }
}