import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/connectDB.js'
import noteRoutes from './route/note.js'
import userRoutes from './route/user.js'

dotenv.config() 

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/notes", noteRoutes)
app.use("/api/users", userRoutes)

const startServer = async () => {
    await connectDb()
    app.listen(port, () => {
        console.log("Server started")
    })
}

startServer()