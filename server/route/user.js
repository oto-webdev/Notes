import express from "express";
import { loginUser, registerUser } from '../controller/user.js'

const router = express.Router()

router.post("/", registerUser)
router.post("/login", loginUser)

export default router;