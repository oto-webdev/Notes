import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/user.js'
import expressAsyncHandler from 'express-async-handler'

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT, { expiresIn: "7d" }) 
}

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })  
    }

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(409).json({ message: "User already exists" })  
    }

    try {
        const user = await User.create({
            email,
            password: hashedPassword
        })

        const token = generateToken(user._id)  

        return res.status(201).json({
            message: "User registered successfully",
            user: { email: user.email },  
            token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })  
    }

    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "Incorrect email or password" })  
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        return res.status(401).json({ message: "Incorrect email or password" }) 
    }

    try {
        const token = generateToken(user._id) 

        return res.status(200).json({
            message: "Login successful",
            email: user.email,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})
