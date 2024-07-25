'use client'
import { useState } from "react";
//import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";


const signStudent=()=>{

  let session = localStorage.getItem("user")
  useLayoutEffect(()=>{
    if(session){
      redirect("/")
  }
  })
  const router=useRouter();
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const [age,setAge]=useState("");
 
const dosign = async()=>{
  if(username=="" || password=="" || age==""){
    alert("filll")
  }else{
    console.warn(username,password);
    let sign=await fetch("http://localhost:4000/user/signup" ,{
      method: 'post',
      body: JSON.stringify({username,password,age}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    sign = await sign.json()
    console.warn(sign);
    if(sign.userid){
  
      localStorage.setItem("user",JSON.stringify(sign))
      router.push('/')
    }else{
      alert("user already exist")
    }

  }

  
}
//

   

  return (
    <main className="mainuser">
      <div className="div1mainuser">
          <div className="div2mainuser">
              <div>
                    <h1 className="logininfo"> SignUp as User </h1>
              </div>
              
                <br>
                </br>
                <div className="div1in2mainuser">
                  <input  defaultValue="User Id" className="t1" id="userid" name="userkiid" onChange={(text)=>setUsername(text.target.value)} >
                      
                      </input>
                      <br>
                      </br>
                      <input  defaultValue="Password"className="t1" id="userpass" name="userkapassword" onChange={(text)=>setPassword(text.target.value)}>
                          
                      </input>
                      <br>
                      </br>
                      <input  defaultValue="age"className="t1" id="userage" name="userkiage" onChange={(text)=>setAge(text.target.value)}>
                          
                      </input>
                </div>
                
                <br>
                </br>
          </div>
          
          <div className="bttndiv">
                  <button className="bton" onClick={()=>dosign()}>
                      signup
                  </button>
                  <button className="bton" onClick={()=>router.push("/orders")}>
                      Back
                  </button>
          </div>
      </div>


    </main>
  );
}

export default signStudent;