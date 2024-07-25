'use client'
import { useLayoutEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

const OrdersPage = () => {
  const router=useRouter();

  useLayoutEffect (() => {
    const session = localStorage.getItem("user");
    if (session) {
      router.push("/orders");
    }else{
      router.push("/");
    }
  }, []);

  const postOrder = async () => {
    try {
      const session = localStorage.getItem("user");
      const { userid, username } = JSON.parse(session);
      let orderid = uuidv4();
      let xc = 0;
      let yc = 0;
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              xc = position.coords.latitude;
              yc = position.coords.longitude;
              const response = await fetch("http://localhost:4000/post_order_details_in_server", {
                method: 'POST',
                body: JSON.stringify({
                  "orderid": orderid,
                  "userid": userid,
                  "username": username,
                  "xc": xc,
                  "yc": yc
                }),
                  headers: {
                    'Content-Type': 'application/json'
                  }
                });
                
                  const data = await response.json();
                  console.warn(data.message);
                  if (data.message=="done") {
                    alert("order placed")
                  }
                  
            },
            (error) => {
              alert(error)
            }
          )
        } else {
          alert("allow location")
        }
   
    } catch (error) {
      console.error(error);
      alert("An error occurred while posting the order details.");
    }
  }

  return (
    <main>
      <div>
        <div>
          <button className="bton" onClick={()=>postOrder()}>
            Place Order
          </button>
          <button className="bton" onClick={()=>router.push("/verify")}>
            verify
          </button>
          <button className="bton" onClick={() => navigation.navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </main>
  );
}

export default OrdersPage;

