import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.ts"
import taskRouter from "./routes/taskRoute.ts"
dotenv.config()
connectDB()
const PORT = process.env.PORT || 4000
const app = express()

console.log("Haaaaalo") 

app.use(express.json())
app.use(cors())

app.get("/", (req, res)=>{
    res.send("Haaaaaalo")
})

app.use("/api/tasks", taskRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`)
})