// 'use client'
// import Image from "next/image";
// import styles from "./page.module.css";
// import { useEffect,useState } from "react";
// import { useRouter } from "next/navigation";
// import Script from 'next/script'
// export default function Home() {
//   const router = useRouter()
//   const [orders, setorders] = useState([]);
//   const [h, seth] = useState(0);
 
  
//     // useEffect(() => {
      
//       const fetchData = async () => {
//         try {
          
//           let session = localStorage.getItem("user");
//           if(!session){
//             router.push("/")
//           }

//           if (h!=0) {
//             orders.map((item) => (
//               localStorage.removeItem(item.orderid),
//               console.warn("hi")
//             ))
//           }





//           const response = await fetch("http://127.0.0.1:4000/orders_manager");
//           if (!response.ok) {
//             throw new Error("Failed to fetch orders");
//           }
//           const data = await response.json();
//           setorders(data.orders);
//           console.log(data);
//           console.warn(data.orders);
//         } catch (error) {
//           console.error("Error fetching orders:", error);
//           // Handle error appropriately, e.g., show a message to the user
//         }
        
//       };

//       fetchData()
//       setInterval(() => {
//         seth(h+1)

//           orders.map((item) => (
//             localStorage.setItem(item.orderid, item.qr),
//             console.warn("hi")
//           ))
      
//         fetchData();
//       }, 5000);

      
//     // }, []);

  
//   return (
    
//     <main >
//       <h4 Styles={{"color":white}}> {h}</h4>
//       <h4>{i}</h4>
//     <div>
//     {orders.map((item) => (
              
//               <div
//                 className="courses"
//                 onClick={() => router.push("/ordersdetail/" + item.orderid)}
//               >
//                 <div className="courseimage">
//                   {/* //one way */}
//                   {/* <img className="imagecourse" src={item.imglink}
//                                 width={100}
//                                 height={100}
                                
//                                 /> */}
//                   {/* //second way */}
                  
                 
//                   {/* <Image
//                     className="imagecourse"
//                     src={item.imglink}
//                     width={120}
//                     height={120}
//                   /> */}
//                 </div>
//                 <div className="coursedetails">
//                   <h4 style={{ fontFamily: "nunito" }} className="h4name">
//                     OrderId: {item.orderid}
//                   </h4>
//                   <p className="p2">
//                     userID:{" "}
//                     <span style={{ color: "wheat" }} className="rsspan">
//                       {" "}
//                       {item.userid} 
//                     </span>
//                   </p>
//                   <p className="p3">Seller Name: {item.username} </p>
//                   <p className="p1" style={{ fontFamily: "Roboto" }}>
//                     X: {item.xc}
//                   </p>
//                   <p className="p1" style={{ fontFamily: "Roboto" }}>
//                     Y: {item.yc}
//                   </p>
//                   <h2>
//                       status: {String(item.delivered)}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//     </div>
//     </main>
//   );
// }
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let session = localStorage.getItem("user");
        if (!session) {
          router.push("/");
        }

        const response = await fetch("http://127.0.0.1:4000/orders_manager");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);

        // Update localStorage for each order
        data.orders.forEach((item) => {
          localStorage.setItem(item.orderid, item.qr);
        });

        console.log(data);
        console.warn(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        // Handle error appropriately, e.g., show a message to the user
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
      fetchData();
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <main>
      <h4 style={{ color: "white" }}>{count}</h4>
      <div>
        {orders.map((item) => (
          <div
            className="courses"
            onClick={() => router.push("/ordersdetail/" + item.orderid)}
            key={item.orderid} // Add key prop for optimization
          >
            <div className="courseimage">
              {/* // Uncomment if you want to use Image component */}
              {/* <Image
                className="imagecourse"
                src={item.imglink}
                width={120}
                height={120}
              /> */}
              {/* // Or use img tag */}
              {/* <img
                className="imagecourse"
                src={item.imglink}
                width={100}
                height={100}
                alt="Course Image"
              /> */}
            </div>
            <div className="coursedetails">
              <h4 style={{ fontFamily: "nunito" }} className="h4name">
                OrderId: {item.orderid}
              </h4>
              <p className="p2">
                userID:{" "}
                <span style={{ color: "wheat" }} className="rsspan">
                  {item.userid}
                </span>
              </p>
              <p className="p3">Seller Name: {item.username}</p>
              <p className="p1" style={{ fontFamily: "Roboto" }}>
                X: {item.xc}
              </p>
              <p className="p1" style={{ fontFamily: "Roboto" }}>
                Y: {item.yc}
              </p>
              <h2>status: {String(item.delivered)}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
