const mongoose = require('mongoose')
const express = require('express')

let dbConnection=async (url)=>{
    let connection=await mongoose.connect(url)
    return connection;
}

module.exports = dbConnection