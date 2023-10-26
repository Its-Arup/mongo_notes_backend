const express = require('express')
const { connection } = require('./db')
const { userRouter } = require('./Routes/user.route')
const { noteRouter } = require('./Routes/note.route')
const app = express()
require("dotenv").config()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use("/user" , userRouter)
app.use("/notes", noteRouter)

app.listen(process.env.PORT, async()=>{
    try {
        await connection
        console.log("port is running on port 4500");
    } catch (error) {
        console.log(error.message);
    }
})