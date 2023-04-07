import React from "react";



const FaceRecognition = ({imageUrl, box}) => {
    return(
        <div className="mt-4 w-full h-auto flex justify-center"> 
        <div className="absolute"> 
        <img id="inputImg"  src={imageUrl} className="detected_img"  style={{maxWidth: "500px"}} /> 
        <div className="bounding-box absolute flex flex-wrap justify-center shadow bg-transparent border-2 border-sky-500 cursor-pointer" 
        style={{ top: box.topRow, bottom: box.bottomRow, left: box.leftCol, right: box.rightCol}} >  </div>
        </div>
        </div>
    )

}

export default FaceRecognition;