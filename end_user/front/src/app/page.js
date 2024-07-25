/////////////////////////////components and datapassing in components
// import styles from "./page.module.css";

// export default function Home() {
//   var a="abhayji"
//   return (
//     <main className={styles.main}>

//       <h1 id="name">
//         hi abhay
//       </h1>
//       <User      name={a}/>
//       <User      name="peter"/>
//       <User      name={"nvbh"}/>
//       <User      name={a}/>
//       <User      name="peter"/>
//       <User      name={"nvbh"}/>

//     </main>
//   );
// }

// const User=(props)=>{
//   return(
//     <div>
//       user component {props.name}
//     </div>
//   )
// }

//////////////////////////// event, function and state
// 'use client'
// import { useState } from "react";
// import styles from "./page.module.css";

// export default function Home() {
//   const [name,setName]=useState("abhi")
//   var fun=()=>{
//     alert("hi")
//   }
//   var fun2=(x)=>{
//     alert(x)
//   }
//   var a="abhayji"
//   var v="mm"
//   var name3="mnjkmn"
//   function update() {
//     setName("kajal")
//   }
//   function update2() {
//     name3="ppp";
//   }
//   return (
//     <main className={styles.main}>

//       <h1 id="name">
//         hi abhay
//       </h1>
//       <button onClick={()=>alert("hello")}>
//         click me
//       </button>
//       <button onClick={fun}>
//         click me
//       </button>
//       <button onClick={()=>{fun2(a) }}>
//         click me
//       </button>

//       <h1 id="name2">
//         {name}
//       </h1>
//       <button onClick={update}>
//         click me to update
//       </button>
//       <h1 id="name3">

//         {name3}

//       </h1>
//       <button onClick={()=>{alert(name3),update2}}>
//         click me to update
//       </button>

//       <button onClick={({c=2,b=5})=>{alert(c+b),fun2(v)}}>
//         click me
//       </button>
//       <User name={"nmj"}/>
//     </main>
//   );
// }

// const User=(props)=>{
//   return(
//     <div>
//       user component {props.name}
//       <User2 valueAB={[100, 90]} valueC={{ a: 10, b: 9}}/>
//       {User3("nmnm")}
//     </div>
//   )
// }

// const User3=(name)=>{
//   return(
//     <div>
//       user component2 {name}
//     </div>
//   )
// }
// const User2=(props)=>{
//   return(
//     <div>
//       user component2 {props.valueAB[1]}
//       user component2 {props.valueC.a}
//     </div>
//   )
// }

///////////////////////// file and folder structure in node js ////////////////

"use client";
// import hidbeforloginsign from "./privatecomponentviaHOC/privcomphoc";
// import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";//for image optimization
// import { Margarine, Roboto } from "next/font/google";

export default function Home() {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("user");
    router.push("/");
    router.refresh();
  }
  function signout() {
    localStorage.removeItem("user");
    router.push("/");
    router.refresh();
  }



  let session = localStorage.getItem("user");
  return (
    <main>
      <div className="nav">
        <div className="divhomemain">
          <div className="divhome1" id="inner1">
            <div className="divhome2" id="inner2">
              <h2 className="cheading" style={{ fontFamily: "Rubik Scribble" }}>
                {" "}
                aeroProps
              </h2>
              <p className="cbheading" style={{ fontFamily: "Rubik Scribble" }}>
                {" "}
                A air solution company{" "}
              </p>
            </div>
            <ul>
              <li>
                {!session ? (
                  <button
                    className="btonhome"
                    onClick={() => router.push("/login/users")}
                  >
                    login
                  </button>
                ) : (
                  <button className="btonhome" onClick={() => logout()}>
                    logOut
                  </button>
                )}
              </li>
              <li>
                {!session ? (
                  <button
                    className="btonhome"
                    onClick={() => router.push("/signup/user")}
                  >
                    signup
                  </button>
                ) : (
                  <button className="btonhome" onClick={() => signout()}>
                    signOut
                  </button>
                )}
              </li>
              <li>
                {session ? (
                  <button
                    className="btonhome"
                    onClick={() => router.push("/orders")}
                  >
                    orders
                  </button>
                ) : (
                  <></>
                )}
              </li>
            
            </ul>
          </div>
        </div>
      </div>

    </main>
  );
}

