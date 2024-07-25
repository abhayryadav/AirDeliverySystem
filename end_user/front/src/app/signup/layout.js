'use client'
import Link from "next/link";
import './login.css'
export default function Layout({
    children
}){
    return (
        
        <div>
            {/* <div className="divv">
                <h1 className="conn"> CoursesOnn </h1>
                <ul className="login-menu">
                    <li className="brackets">
                        <Link href="/"> Home</Link>
                    </li>
                    <li className="brackets">
                        <Link  href="/signup/user"> SignUp Users</Link>
                    </li>
                    <li className="brackets">
                        <Link href="/signup/seller"> SignUp Sellers</Link>
                    </li>
                    <li className="brackets">
                        <Link href="/signup/admin"> SignUp Admin</Link>
                    </li>
                    <li className="brackets">
                        <Link href="/login/users"> login</Link>
                    </li>
                    <li className="brackets">
                        <Link href="/about"> about </Link>
                    </li>
                </ul>
            </div>


            <div className="divvv"> */}
            {children}
            {/* </div> */}

        </div>
        
        
  );
}
