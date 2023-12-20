const express = require('express')
const dbConnection = require('./connection/connection')
require('dotenv').config()
let Helper = require('express-async-handler')
let Product=require('./model/product.model')
const router = require('./routes/product.router')
let cors=require('cors')


let app = express()
app.use(cors())
let connect=async()=>{  
     app.listen(process.env.PORT,()=>{
        console.log("app listening on port " + process.env.PORT);

     })
    await dbConnection(process.env.URL)
    console.log("database connection sucessfully");
}
connect()

//! fetch data from API and send it to database


let fetchAndSend = async()=>{
    let products=await Product.find({})
    if(products.length===0)
    {  
    let Data= await fetch("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    Data =await Data .json();
            for(let i=0; i<Data.length; i++)
            {
                await Product.create(Data[i])
            }
    } 
}
fetchAndSend()


app.use('/products',router)



