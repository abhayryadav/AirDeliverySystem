const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs")
const jwt= require("jsonwebtoken")
const secretkeyseller="nvbghr65/nm"
const secretkeyuser="fnkjnjfhr48/v"
const port= 4000;
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors()) 



const getConnect_users = require('./db_connection_users')
// const getConnect_sellers = require('./db_connection_sellers')
// const getConnect_solvers = require('./db_connection_solvers')
// const getConnect_courses = require('./db_connection_courses')




function tokengeneratoruser(value,secretkey){
    token = jwt.sign(value,secretkey);
    return token;
}
// function tokengeneratorseller(value,secretkey){
//     token = jwt.sign(value,secretkey);
//     return token;
// }
// const sellerAut = async (req,res,next) =>{
//     const { username, password } = req.headers;
//     let sellersdb= await getConnect_sellers()
//     const admin = sellersdb.find({ "username": username ,"password":password })
//     if(admin){
//         next();
//     }else{
//         res.status(403).json({message:'admin authentication failed'})
//     }

// }
const userAut = async (req,res,next) =>{
    const { username, password } = req.headers;
    let usersdb= await getConnect_users()
    const user = usersdb.find({ "username": username ,"password":password })
    if(user){
        console.log("auth passed")
        next();
    }else{
        console.log("auth failed")
        res.status(403).json({message:'user authentication failed'})
    }

}
// const authenticationjwtseller=(req,res,next)=>{
//     const authtoken = req.headers.authorization;
//     if(authtoken){
//         const token = authtoken.split(" ")[1];
//         //console.log(token)
//         jwt.verify(token,secretkeyseller,(err,iddata)=>{
//             if(err){
//                 return res.send({message:'user authentication failed'})
//             }else{
//                 req.id = iddata;
//                 console.log(req.id);
                
//                 next();
//             }
            
//         })
//     }else {
//         res.send({ message: 'Authorization header missing' });
//     }
// }
// const authenticationjwtuser=(req,res,next)=>{
//     const authtoken = req.headers.authorization;
//     if(authtoken){
//         const token = authtoken.split(" ")[1];
//         //console.log(token)
//         jwt.verify(token,secretkeyuser,(err,iddata)=>{
//             if(err){
//                 return res.send({message:'user authentication failed'})
//             }else{
//                 req.id = iddata;
//                 console.log(req.id);
//                 next();
//             }
            
//         })
//     }else {
//         res.send({ message: 'Authorization header missing' });
//     }
// }





module.exports = {
    // tokengeneratorseller,
    tokengeneratoruser,
    // authenticationjwtseller,
    // authenticationjwtuser,
    // sellerAut,
    userAut
};