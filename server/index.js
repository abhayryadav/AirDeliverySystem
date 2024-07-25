const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port= 4000;
app.use(express.json());
app.use(bodyParser.json());
var cors = require('cors')
app.use(cors()) 
const jwt= require("jsonwebtoken")
const qrCode=require("qrcode")
const secretkeyuser="fnkjnjfhr48/v"
const { v4: uuidv4 } = require('uuid');

const getConnect_users = require('./db_connection_users.js')
const getConnect_orders = require('./db_connection_orders.js')


const tokengeneratoruser = require('./middlewares.js').tokengeneratoruser;
const userAut = require('./middlewares.js').userAut;



app.post("/post_order_details_in_server",async(req,resp)=>{
    try {

        let xc=req.body.xc
        let yc=req.body.yc
        let userid =req.body.userid
        let username=req.body.username
        let orderid=req.body.orderid
        
        let qrdata = JSON.stringify({"userid":userid,"orderid":orderid})
        const qrImage = await qrCode.toDataURL(qrdata)
        


        let ordersdb= await getConnect_orders()
        let order={
            "orderid":orderid,
            "userid":userid,
            "username":username,
            "xc":xc,
            "yc":yc,
            "qr":qrImage.split('64,')[1],
            "delivered":false
        }
        
        await ordersdb.insertOne(order)
        let usersdb= await getConnect_users()
        const userExis = await usersdb.findOne({ username: username })
        if (userExis) {
            await usersdb.updateOne({userid:userid},{$push:{orders:{order}}})
        }else{
            res.json({message:"user doesn't exist"});
        }
        console.log(qrImage)
        console.log("--------------------------")
        console.log(qrImage.split('64,')[1])
        console.log(await qrCode.toString(qrdata,{type:'terminal'}))//just to see qr in terminal
        resp.json({"message":"done"})
        
    } catch (error) {
        resp.json({ "err": error.message }); // Improved error handling
    }
    

})
app.get("/get_all_orders_from_server",async(req,resp)=>{
    try {
        let ordersdb= await getConnect_orders()
        let data= await ordersdb.find().toArray()
        resp.json(data)
    } catch (error) {
        console.log(error)
        console.warn(error)
        resp.json({"error":"problem at server"})
    }
  

})

app.post("/user/signup",async(req,res)=>{
    let user_recived = req.body;
    let usernamee= user_recived.username
    let usersdb= await getConnect_users()
    const userExis = await usersdb.findOne({ username: usernamee })
    if (userExis) {
        res.status(403).json({message:"user already exist"});
    }else{
        const userid = uuidv4();
        const user={"username":usernamee,"password":user_recived.password,"userid":userid,"orders":[]}
        let token = tokengeneratoruser(userid,secretkeyuser);
        await usersdb.insertOne(user)
        res.json({message:"user created",authtoken:token,userid:userid,username:usernamee});
    }
})
app.post("/user/login",userAut,async(req,res)=>{
    let usersdb= await getConnect_users()
    const { username, password } = req.body;
   const user =await usersdb.findOne({ "username": username ,"password":password })
    
    try {
        if (user!=null) {
            console.log(user)
            console.log(user.userid) 
            let usernamee= user.username
            const useridd=user.userid
            const token = tokengeneratoruser(user.userid,secretkeyuser);
            res.json({ message: "logged in successfully", authtoken: token ,userid:useridd,username:usernamee,});
        } else {
            console.log(user)
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error)
        res.json({error})
    }
    
})
app.post("/verify",async (req,resp)=>{
    const orderid=req.body.orderid
    let ordersdb= await getConnect_orders()
    let orderexist= await ordersdb.findOne({orderid})
    //if orderid found set delivered resp done
    if(orderexist){
        await ordersdb.updateOne(
            {'orderid': orderid},
            {
                $set: {
                    'delivered':true
                }
            }
        )
        resp.json({"message":"done"})
    }
    //else order error resp auth for order failed
    else{
        resp.json({"message":"order not found"})
    }
})
app.get("/orders_manager",async (req,resp)=>{
    let ordersdb= await getConnect_orders()
    let orders= await ordersdb.find().toArray()
    //if orderid found set delivered resp done
   
    resp.json({orders})
   
})
function started() {
    console.log(`Server is running at http://localhost:${port}`);
}

app.listen(port, started);

