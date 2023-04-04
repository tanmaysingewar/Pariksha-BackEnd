const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config()


const app = express();
const uri = "mongodb+srv://Tanmay:VLu37W5awUDhCuU@pariksha.wcrxmss.mongodb.net/?retryWrites=true&w=majority";

//Connecting to MONGODB (Locally)
mongoose.connect( uri,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log('DB IS CONNECTED')
})

//Importing route
const facultyRoutes = require("./routes/faculty")

//middlewares
app.use(bodyParser.json())
app.use(cors())

app.use("/api",facultyRoutes)
app.use('/api',require('./routes/room'))
app.use('/api',require('./routes/subject'))
app.use('/api',require('./routes/createSchedule'))
app.use('/api',require('./routes/replace'))


// Port 
const port = process.env.PORT || 8080

app.listen(port, ()=>{
    console.log('SERVER IS RUNNING AT',port)
})