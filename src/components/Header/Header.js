import React from "react";
import Logo from './../../img/face-id.png'

const Header = ({ onRouteChange, isSignedIn }) => {
   
        
        if (isSignedIn) {
            return(
        <div className="p-4  w-full flex justify-between items-center">
            <img src={Logo} style={{ width: '45px' }} />
            <nav>
                <p className="text-xl font-bold underline cursor-pointer hover:text-slate-100 transition"
                    onClick={() => onRouteChange("signout")}
                > Sign out  </p>
            </nav>
        </div>
            )
    }
    else {
        return (
        <div className="p-4  w-full flex justify-between items-center">
            <img src={Logo} style={{ width: '45px' }} />
            <nav>
                <p className="text-xl font-bold underline cursor-pointer hover:text-slate-100 transition"
                    onClick={() => onRouteChange("signin")}
                > Sign in  </p>
                <p className="text-xl font-bold underline cursor-pointer hover:text-slate-100 transition"
                    onClick={() => onRouteChange("register")}
                > Register  </p>
            </nav>
        </div>
    )    
    }
    

}

export default Header