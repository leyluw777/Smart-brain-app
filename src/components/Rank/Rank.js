import React from "react";

const Rank = ({name, entries}) => {
    return(
        <div className="w-full text-center m-4"> 
           <p className="font-bold text-xl">   {`${name}, your current entry count is...`} </p>
           <p className="text-5xl font-bold">  {entries} </p>
        </div>
    )

}

export default Rank;