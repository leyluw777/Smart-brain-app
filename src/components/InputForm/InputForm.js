import React from "react";
import './inputform.css'


const InputForm = ({ onInputChange, onBtnSubmit }) => {
    return(
        <div className="input-form lg:w-2/5 xl:w-2/5 w-full bg-slate-200 h-32 flex flex-wrap items-center p-2 rounded-2xl"> 
          <input type="text" className="w-2/3 h-10 text-pink-600 p-4 outline-none rounded-l-2xl" onChange={onInputChange} /> 
          <button className="h-10 bg-slate-800 w-1/3 rounded-r-2xl bg-purple-800" onClick={onBtnSubmit}> Detect </button>
        </div>
    )

}

export default InputForm;