import React from "react";
import './Table.css'

function Table(){
    return(
        <div className="table_block">
             <img src="/images/table_image.png" alt="Table Image" class="table_image" />
             <div className="container">
                <img src="/images/moves_image.png" className="movesbg"/>
                <div className="moves_block">
                    <div className="first_section">
                    <button className="first">First</button>
                    <button className="second">Second</button>
                    </div>

                    <div className="second_section">
                    <text className="score">750</text>
                    <text className="status">Seen</text>
                    <text>Ojjas' Turn</text>
                    </div>

                    <div className="third_section">
                    <button className="third">Third</button>
                    <button className="fourth">Fourth</button>
                </div>
                </div>
                    
             </div>
        </div>
    );
}
export default Table;
