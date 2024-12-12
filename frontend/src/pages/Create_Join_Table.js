import React, { useContext } from "react";
import './Create_Join_Table.css'
import { useNavigate } from "react-router-dom";

function Create_Join_Table(){
    const navigate=useNavigate();
    const goToTableSetting=()=>{
      navigate('/table_setting');
    }
    const goToTable=()=>{
        navigate('/game_table');
      }
    return(
        <div className="create_body_block">
            <div className="create_block">
                <button className="create_button" onClick={goToTableSetting}>Create Table</button>
            </div>

            <div className="join_block">
                <input type="number" id="input_code" placeholder="Enter code"/>
                <button className="join_button" onClick={goToTable}>Join Table</button>
            </div>
        </div>
    );
}
export default Create_Join_Table;