'use client'
import { useState } from "react";
//import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const login=()=>{

  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const dologin = async()=>{

    if(username=="" || password=="" ){
      alert("filll")
    }else{
      console.warn(username,password);
      let login=await fetch("http://localhost:4000/user/login" ,{
        method: 'post',
        body: JSON.stringify({username,password}),
        headers:{
          'Content-Type':'application/json'
        }
      })
      login = await login.json()
      console.warn(login);
      if(login.userid){
        localStorage.setItem("user",JSON.stringify(login))
        router.push('/')
      }else{
        alert("user doesn't exist")
      }
  
    }
  
  }
//

    const router=useRouter();

  return (
    <main className="mainuser">
      <div className="div1mainuser">
          <div className="div2mainuser">
              <div>
                    <h1 className="logininfo"> Login as User </h1>
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
                </div>
                
                <br>
                </br>
          </div>
          
          <div className="bttndiv">
                  <button className="bton" onClick={()=>dologin()}>
                      Login
                  </button>
                  <button className="bton" onClick={()=>router.push("/")}>
                      Back
                  </button>
          </div>
      </div>


    </main>
  );
}

export default login;