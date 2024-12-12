import React, { useEffect, useState } from "react";
import './Table.css'
import { getSocket } from './socket';



function Game_Table(){
    const [players,setPlayers]=useState([]);
    const [poolMoney,setPoolMoney]=useState(0);
    const socket =getSocket();
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isStartClicked,setIsStartClicked]=useState(false);
    const [isDealClicked,setIsDealClicked]=useState(false);
    const [inputValue,setInputValue]=useState("");
    const [activePlayerId, setActivePlayerId] = useState(null); 
    const [blindBet,setBlindBet]=useState(0);
    const [myMoney,setMyMoney]=useState(0);
    const[myId,setMyId]=useState(null);
    let currentPlayerMoney = players.find(player => player.id === socket.id)?.money;
    let winners=[];
    const numberOfPlayers=players.length;

    const handleStart=()=>{
        socket.emit("handleStart");
        setIsStartClicked(true);
        
        setActivePlayerId(null);
        
    }

    const handleChaal=()=>{
        if(isStartClicked)
        socket.emit("handleChaal");
       
    }

    const handle2xChaal=()=>{
        if(isStartClicked)
        socket.emit("handle2xChaal");
        
    }

    const handleButtonClick = () => {
            if(isStartClicked)
            setIsButtonClicked(true); // Update state to render a div
        };

    const handleBlind=()=>{
        if(isStartClicked)
        socket.emit("handleBlind");
    }

    const handle2xBlind=()=>{
        if(isStartClicked)
        socket.emit("handle2xBlind");
    }

    const handleDeal=()=>{
        if(isStartClicked)
        setIsDealClicked(true);
    }

    const handleDone=()=>{
        socket.emit("handleDone",winners);
        setIsButtonClicked(false);
        setIsDealClicked(false);
        setIsStartClicked(false);

    }

    const handleGift = (playerId) => {
        setActivePlayerId(playerId);
       
        console.log("activeplayer",activePlayerId);

        
      };
    
      const handleInputChange = (e) => {
      
        const value = e.target.value;

    
        if (/^-?\d*$/.test(value)) { 
            setInputValue(value); 
        }
        
      };

      const handleGiftDone=(playerId)=>{
    
        const money = parseInt(inputValue, 10); 

    if (!money || isNaN(money)) {
        alert("Please enter a valid gift amount!");
        return;
    }

    const playerGift = { money, id: playerId };
    socket.emit("playerGift", playerGift); 

    
    setInputValue(""); 
    setActivePlayerId(null); 

    console.log("Gift sent to player:", playerId, "Amount:", money);
      }



    const toggleSelection = (id) => {
        winners.push(id);
      };

    useEffect(()=>{

        socket.emit('requestUsernames');

        socket.on("playerHistory",(playerHistory)=>{
            setPlayers(playerHistory);
        })
        socket.on("poolMoney",(pool_money)=>{
            setPoolMoney(pool_money);
        })
        socket.on("gameStarted",()=>{
            setIsStartClicked(true);
        })
        socket.on("setCompleted",()=>{
            setIsButtonClicked(false);
            setIsDealClicked(false);
            setIsStartClicked(false);
        })
        socket.on("blindBet",(blindBet)=>{
            setBlindBet(blindBet);
        })
        socket.on("id",(id)=>{
            setMyId(id);
        })
    
        return () => {
            socket.off("playerHistory");
            socket.off("poolMoney");
            socket.off("gameStarted");
            socket.off("setCompleted");
            socket.off("blindBet");
            socket.off("id");
        };
    },[socket]);

    useEffect(() => {
        console.log("Active player ID updated:", activePlayerId);
    }, [activePlayerId]);
    
    
    
    return(
        <div className="table_block">
            <div className="table_container">
                <img src="/images/table_image.png" alt="Table Image" class="table_image" />
                {isDealClicked && <p className="condDiv">Select Winners</p>}
                <div className="players_list">
                {isDealClicked && (
                    <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                        <label>
                            <p> {player.userName}: {player.money}</p>
                            {/* The checkbox after the player name */}
                            <input
                            type="checkbox"
                            id="checkbox"
                            checked={player.selected}
                            onChange={() => toggleSelection(player.id)}
                            />
                        </label>
                        </li>
                    ))}
                    </ul>
                )}

                {!isDealClicked && !isStartClicked&&(
                    <ul>
                    {players.map((player) => (
    <li key={player.id}>
        <label>
            <p>{player.userName}: {player.money}</p>
            {activePlayerId === player.id ? (
                <div className="giftInputBlock">
                    <input
                        className="giftInput"
                        type="text"
                        placeholder="Enter an integer"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <button
                        className="giftDone"
                        onClick={() => handleGiftDone(player.id)}
                    >
                        Send
                    </button>
                </div>
            ) : (
                <button
                    className="gift"
                    onClick={() => handleGift(player.id)}
                >
                    Gift
                </button>
            )}
        </label>
    </li>
))}
                    </ul>
                )}
                {isStartClicked&&!isDealClicked&&(
                    <ul>
                    {players.map((player) => (
                        <li key={player.id}>
                        <label>
                            <p> {player.userName}: {player.money}</p>  
                        </label>
                        </li>
                    ))}
                    </ul>
                )

                }
                    
                </div>
                <div className="pool_money">{poolMoney}</div>
            </div>
             <div className="container">
                <img src="/images/moves_image.png" className="movesbg"/>
                <div className="moves_block">
                    <div className="first_section">
                    {isButtonClicked ? (
                            <button className="first" onClick={handleChaal} >
                            Chaal
                            <p className="bet">{2*blindBet}</p>
                            </button>
                        ) : (
                            <button className="first" onClick={handleBlind} >
                            Blind
                            <p className="bet">{blindBet}</p>
                            </button>
                        )}
                    <button className="second">Pack</button>
                    </div>

                    <div className="second_section">

                    <text className="score">{currentPlayerMoney !== undefined ? currentPlayerMoney : 'Loading...'}</text>

                        {isButtonClicked ? (
                            <p className="disabledSeeButton">Seen</p>
                        ) : (
                            <button className="seeButton" id="seeButton" onClick={handleButtonClick}>
                            See
                            </button>
                        )}
                   
                    
                    </div>

                    <div className="third_section">
                    {isButtonClicked ? (
                            <button className="third" onClick={handle2xChaal} >
                            2x Chaal
                            <p className="bet">{4*blindBet}</p>
                            </button>
                        ) : (
                            <button className="third" onClick={handle2xBlind} >
                            2x Blind
                            <p className="bet">{2*blindBet}</p>
                            </button>
                        )}
                    <button className="fourth" onClick={handleChaal}>SideShow <p className="bet">{2*blindBet}</p></button>
                </div>
                </div>
                    
             </div>
        </div>
    );
}
export default Game_Table;
