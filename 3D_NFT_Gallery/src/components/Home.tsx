import React, {useEffect, useState} from "react";
import '../home.css';
import background from '../images/back.png';
import rootstockGalleryLogo from '../images/MicDrop.png';



export const Home = (): JSX.Element => {
    const imgExtensions = ["png", "png", "png", "png", "png", "png", "png"]
    const [imageIndex, setImageIndex] = useState(1)
    useEffect(()=>{
        const a = setInterval( ()=>{
            setImageIndex(prev => prev % 4 + 1)
        }, 1000)
        return () => clearInterval(a)
    }, [])

    return <>
        <main style={{backgroundImage:`url(${background})`, height:"100vh",  margin:"auto" }} >
            <div className="wrapper">
          
           

                <div className="content">
                    <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "15px auto", textAlign: "center"}}>
                        <img src={rootstockGalleryLogo} style={{borderRadius: "50%", width: "100px", marginBottom: "10px"}}/>
                        <h3><b>Micdrop Gallery</b></h3>

                   
                        <div>
                        
                            <a href="/gallery-micdrop" style={{margin: "0px 20px"}}>
                                <button className="mt-3 button">Go to gallery</button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </main>
    </>
}

export default Home
