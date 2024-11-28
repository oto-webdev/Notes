import jwt from 'jsonwebtoken'
import User from '../model/user.js'

const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(404).json({ message: "No auth token found" })
    }

    const token = authorization.split(" ")[1]

    try {
        const { _id } = jwt.verify(token, process.env.JWT)
        req.user = await User.findById(_id).select("_id")
        next()
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

export default auth;