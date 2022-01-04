import User from '../models/UserModel.js'
import cryptoJs from 'crypto-js';
import jwt from 'jsonwebtoken'

// Register new user to the DB
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body
    const newUser = new User({
        username: username,
        email: email,
        password: cryptoJs.AES.encrypt(password, process.env.HASH_SECRET).toString()
    });
    try {
        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }  
}

// Login user
export const loginUser = async (req, res) => {
    const { username } = req.body
    try {
        const user = await User.findOne({ username: username })
        !user && res.status(401).json('Wrong credentials')
        
        const plainPassword = cryptoJs.AES.decrypt(
					user.password,
					process.env.HASH_SECRET
				).toString(cryptoJs.enc.utf8);

        plainPassword !== req.body.password && res.status(401).json('Wrong credentials')

        // Generate access token upon successful user login
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, {expiresIn: '3d'})

        // Don't return the password when returning user details
        const {password, ...others} = user._doc
        res.status(200).json({...others, accessToken})
    } catch (error) {
        res.status(500).json(error)
    }
}