import React, { useEffect, useState } from "react";
import './Table.css'
import { getSocket } from './socket';



function Table(){
    const [players,setPlayers]=useState([]);
    const [poolMoney,setPoolMoney]=useState(0);
    const [userName,setUserName]=useState("");
    const socket =getSocket();
    const numberOfPlayers=players.length;

    const handleStart=()=>{
        socket.emit("handleStart");
        
    }

    const handleChaal=()=>{
        socket.emit("handleChaal");
        console.log("in handle chaal");
       
    }

    const handle2xChaal=()=>{
        socket.emit("handle2xChaal");
        console.log("in handle 2xchaal");
    }

    useEffect(()=>{

        socket.on("playerHistory",(playerHistory)=>{
            setPlayers(playerHistory);
        })
        socket.on("poolMoney",(pool_money)=>{
            setPoolMoney(pool_money);
        })
        return () => {
            socket.off("playerHistory");
            socket.off("poolMoney");
        };
    },[socket]);

    
    
    return(
        <div className="table_block">
            <div className="table_container">
                <img src="/images/table_image.png" alt="Table Image" class="table_image" />
                <div className="players_list">
                    {players.map((player, index) => (
                        <p key={index}>{player.userName}:{player.money}</p>
                    ))}
                    <button className="start" onClick={handleStart}>start</button>
                </div>
                <div className="pool_money">{poolMoney}</div>
            </div>
             <div className="container">
                <img src="/images/moves_image.png" className="movesbg"/>
                <div className="moves_block">
                    <div className="first_section">
                    <button className="first" onClick={handleChaal} >Chaal</button>
                    <button className="second">Second</button>
                    </div>

                    <div className="second_section">
                    <text className="score">750</text>
                    <text className="status">Seen</text>
                    <text>Ojjas' Turn</text>
                    </div>

                    <div className="third_section">
                    <button className="third" onClick={handle2xChaal}>2x Chaal</button>
                    <button className="fourth">Fourth</button>
                </div>
                </div>
                    
             </div>
        </div>
    );
}
export default Table;
