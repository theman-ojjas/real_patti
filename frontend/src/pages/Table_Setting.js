import React from "react";
import './Table_Setting.css'
import { useNavigate } from "react-router-dom";

function Table_Setting(){
    const navigate=useNavigate();
    const goToTable=()=>{
    navigate('/table');
}
    return(
        <div className="body_block">
            <div className="setting_block">
                <text>Create Table</text>
            <div className="boot_amount">
                Boot Amount
                <input type="number" id="boot_amount" placeholder="Enter boot amount"/>
            </div>
            <div className="pot_limit">
                Pot Limit
                <input type="number" id="pot_limit" placeholder="Enter pot limit"/>
            </div>
            <div className="max_bet_value">
                Max Bet Value
                <input type="number" id="max_bet_value" placeholder="Enter Max Bet Value"/>
            </div>
            <button className="create_button" id="margin_cb" onClick={goToTable}>Create Table</button>
            </div>
        </div>
    );
}

export default Table_Setting;