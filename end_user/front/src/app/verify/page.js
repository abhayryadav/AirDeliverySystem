'use client'
import { useState } from "react";
//import styles from "./page.module.css";
import { redirect, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import {Script }from "next/script";

const verify=()=>{
    const [uuserid,setUserid]=useState("");
    const [Orderid,setOrderid]=useState("");
    
        const router=useRouter()
        let session = localStorage.getItem("user")
        const { userid, username } = JSON.parse(session);
        
        const done = async()=>{
           
            //local user if match get mongo user delivered
            if (uuserid == userid) {
                console.warn(uuserid)
                console.warn(userid)
                let data = await fetch("http://localhost:4000/verify" ,{
                method: 'post',
                body: JSON.stringify({"orderid":Orderid}),
                headers:{
                  'Content-Type':'application/json'
                }
              })
              data=await data.json()
              if(data.message=="done"){
                alert("delivery successful")
                router.push("/")
              }else{
                alert("order not found")
                router.push("/verify")
              }
            }
            //local user if no match on scan again

            else{
                alert("it's not your order")
                router.push("/verify")
            }
        }
           
        useLayoutEffect(()=>{
            if(!session){
                router.push("/")
            }
        },[])
        
    
       

  return (
    <main>
      <input
        defaultValue="userId"
        className="t1"
        id="sellerkiid"
        name="userkiid"
        onChange={(text) => setUserid(text.target.value)}
      ></input>
      <br></br>
      <input
        defaultValue="orderid"
        className="t1"
        id="userpass"
        name="userkapassword"
        onChange={(text) => setOrderid(text.target.value)}
      ></input>
      <br></br>
      <button className="bton" onClick={()=>done()}>
                      ok
                  </button>
    </main>
  );
}

export default verify;


// 'use client'
// import { useState } from "react";
// //import styles from "./page.module.css";
// import { useEffect } from "react";
// import { Html5QrcodeScanner } from "html5-qrcode";
// import Script from "next/script";
// import { redirect, useRouter } from "next/navigation";


// const Verify = () => {
//     const router = useRouter();
//     const [scannerResult, setScannerResult] = useState(null);

//     useEffect(() => {
//         const session = localStorage.getItem("user");
//         if (!session) {
//             router.push("/");
//             return;
//         }

//         const { userid } = JSON.parse(session);

//         const onScanSuccess = async (result) => {
//             try {
//                 setScannerResult(JSON.parse(result));
//                 // Check if scanned user id matches with the logged in user id
//                 if (scannerResult.userid === userid) {
//                     const data = await fetch("http://localhost:4000/verify", {
//                         method: 'post',
//                         body: JSON.stringify({ "orderid": scannerResult.orderid }),
//                         headers: {
//                             'Content-Type': 'application/json'
//                         }
//                     });
//                     const responseData = await data.json();
//                     if (responseData.message === "done") {
//                         alert("Delivery successful");
//                         router.push("/");
//                     } else {
//                         alert("Order not found");
//                         router.push("/verify");
//                     }
//                 } else {
//                     alert("It's not your order");
//                     router.push("/verify");
//                 }
//             } catch (error) {
//                 console.error("Error occurred: ", error);
//                 alert("Error occurred: " + error);
//             }
//         };

//         const onScanFailure = (error) => {
//             console.error("Error occurred: ", error);
//             alert("Error occurred: " + error);
//         };

//         const scan = () => {
//             let html5QrcodeScanner = new Html5QrcodeScanner(
//                 "reader",
//                 { fps: 10, qrbox: {width: 250, height: 250} },
//                 /* verbose= */ false);
//               html5QrcodeScanner.render(onScanSuccess, onScanFailure);
//         };

//         scan();

//     }, []);

//     return (
//         <>
//             <main>
               
//                 <div id="reader"></div>
//             </main>
//         </>
//     );
// }

// export default Verify;
