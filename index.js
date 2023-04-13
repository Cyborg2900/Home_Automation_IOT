require('dotenv').config();

const express=require('express');

const bodyParser = require('body-parser');

//db
const mongoose=require('mongoose')
const {MongoClient}= require("mongodb");



//routes
const users= require('./routes/users');
const devices=require('./routes/devices');

const app=express();

const PORT=process.env.PORT || 5005;


 const url = process.env.MONGO_URI;
//const url ='mongodb://localhost:27017/IOT_db2';
const client = new MongoClient(url);


app.use(bodyParser.json());
app.use('/user',users);
app.use('/device',devices);

//creating a function to connect to mongodb for cyclic
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}





app.get('/testing',(req,res)=>{
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.status(200).send('testing complete');
})











//Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
      console.log("listening for requests");
  })
})



// mongoose.connect(url).then(() => {

//     app.listen(PORT, ()=>{
//         console.log('listening to port');
//     })
//   }).catch(error => {
//     console.error(error);
//   });