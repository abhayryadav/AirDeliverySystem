'use client'
import Base64ToImage from "@/app/imagebasecomp"
import "./coursedetail.css"
export default function handlers({params}){
    console.log("-------")
    console.log(params)
    
    const imagebase64 = localStorage.getItem(params.img)
    
    return(
        
        <div>
            <div>
                
                <div className="coursedit">
                    <div>
                        <h1 className= "courseh1">{params.img}</h1>
                        <h4>{ imagebase64 }</h4>
                        <Base64ToImage base64String={imagebase64} />
                    </div>
                    <div>
                        <h3 className="courseh3">QR</h3>
                    </div>
                    
                </div>




                <div>
                    
                </div>

            </div>
            
        </div>
    )
}