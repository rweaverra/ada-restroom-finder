const express = require("express")
const mongoose = require("mongoose")

const mongoDB = 'mongodb://13.57.206.195:27017/test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;



const app = express()

app.listen(4000, () => {
	console.log("Server is listening on port 4000!")
});


