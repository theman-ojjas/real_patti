import React from "react";
import './Create_Join_Table.css'

function Create_Join_Table(){
    return(
        <div className="create_body_block">
            <div className="create_block">
                <button className="create_button">Create Table</button>
            </div>

            <div className="join_block">
                <input type="number" id="input_code" placeholder="Enter code"/>
                <button className="join_button">Join Table</button>
            </div>
        </div>
    );
}
export default Create_Join_Table;