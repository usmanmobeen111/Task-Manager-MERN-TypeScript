import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.ts"
import taskRouter from "./routes/taskRoute.ts"
dotenv.config()
connectDB()
const PORT = process.env.PORT || 4000
const app = express()


app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Task Manager API is running...")
})

app.use("/api/tasks", taskRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})