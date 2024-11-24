import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDb from './config/connectDb.js'
import notesRouter from './router/noteRouter.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/notes", notesRouter)

const startServer = async () => {
    await connectDb()
    app.listen(port, () => {
        console.log("Server started")
    })
}

startServer()