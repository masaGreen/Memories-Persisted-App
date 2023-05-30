require("dotenv").config()
const express = require("express")
const path = require("path")
const multer = require ("multer")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const getRoute = require("./routes/api")
const authRoute = require("./routes/auth")
const registerRoute = require("./routes/register")


const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI, ()=>{console.log("connnected successfully")})
    } catch (error) {
       console.log(error) 
    } 
}
dbConnect()
app.use(cors({
    origin:"http://localhost:3000"
}))
app.use(express.json())
app.use( express.static("images"))
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./images")
    },
    filename:(req,file, cb)=>{
        cb(null, req.body.name)
    }
})

const upload = multer({storage})


app.post("/api/imageupload", upload.single("uploadFile"), (req,res)=>{console.log("successful upload")})
app.use("/api", getRoute)
app.use("/auth", authRoute)
app.use("/register", registerRoute)
// app.use("/api", , getRoute)


app.listen("5000",()=>{console.log("server running on port 5000")})
// "start": "node server.js"