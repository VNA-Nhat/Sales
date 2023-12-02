const express = require("express");
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const routes = require("./src/router");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(cors())
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cookieParser())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() =>{
    console.log('Connect db success')
})
.catch((err) =>{
    console.log(err)
})

app.listen(port, () =>{
    console.log('Server is running in port', + port)
})
