import React from "react";
import './Table_Setting.css'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSocket } from './socket';

function Table_Setting(){
    const socket=getSocket();
    const [bootAmount,setBootAmount]=useState(null);
    
    const [initialValue,setInitialValue]=useState(null);
    const navigate=useNavigate();
    const goToTable=()=>{
    const value={bootAmount,initialValue};
    socket.emit("tableSetting",value);
    navigate('/table');
}
    const handleBoot=(e)=>{
        const value = e.target.value;
        if (/^-?\d*$/.test(value)) { 
            setBootAmount(value); 
        }
    }
    
    const handleInitial=(e)=>{
        const value = e.target.value;
        if (/^-?\d*$/.test(value)) { 
            setInitialValue(value); 
        }
    }
    return(
        <div className="body_block">
            <div className="setting_block">
                <text>Create Table</text>
            <div className="boot_amount">
                Boot Amount
                <input type="number" id="boot_amount" placeholder="Enter boot amount" onChange={handleBoot} />
            </div>
           
            <div className="initial_stake">
                Initial Stake
                <input type="number" id="max_bet_value" placeholder="Enter Initial Stake" onChange={handleInitial}/>
            </div>
            <button className="create_button" id="margin_cb" onClick={goToTable}>Create Table</button>
            </div>

        </div>
    );
}

export default Table_Setting;