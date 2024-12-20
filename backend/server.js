const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "https://real-patti-1.onrender.com/",
      },
    });

app.use(cors());

app.get("/", (req, res) => {
    res.send("Server is running...");
  });

var t=0;
let playerHistory=[];
let bootAmount=10;
let blindBet=bootAmount;
let defaultMoney=1000;
let poolMoney=0;
let potLimit=1000000;
let maxBetValue=10000000;


  io.on("connection",(socket)=>{
    t++;
    console.log("New Client Connected",socket.id,t);

    

    socket.on("userName",(userName)=>{
      let playerPosition=1;
      
      playerHistory.forEach((player) => {
        player.position=playerPosition;
        playerPosition++;
    });

    const findPlayer = playerHistory.find((p) => p.id=== socket.id);

      if(!findPlayer){
        const player={userName,money:defaultMoney,id:socket.id,position:playerPosition}
        console.log(`Username: ${player.userName}`,socket.id);
        playerHistory.push(player);
      }
    
        socket.emit("playerName",userName);
        io.emit("playerHistory",playerHistory);
        io.emit("poolMoney",poolMoney);
        io.emit("id",socket.id);
        io.emit("blindBet",blindBet);
    })
    socket.on("requestUsernames",()=>{
      io.emit("playerHistory",playerHistory);
      io.emit("poolMoney",poolMoney);
      io.emit("id",socket.id);
      io.emit("blindBet",blindBet);
    })

    socket.on("handleStart", () => {
        playerHistory.forEach((player) => {
            player.money-=bootAmount;
            poolMoney+=bootAmount;
        });
        io.emit("poolMoney",poolMoney);
        io.emit(socket.id);
        io.emit("blindBet",blindBet);
        io.emit("playerHistory",playerHistory);
        io.emit("gameStarted");
    });

    socket.on("handleChaal",()=>{
        
        const player = playerHistory.find((p) => p.id=== socket.id);
        console.log(socket.id);
        if(player){
            player.money-=2*blindBet;
            poolMoney+=2*blindBet;
            console.log(player.userName+player.money);
        }
        io.emit("poolMoney",poolMoney);
        io.emit(socket.id);
        io.emit("blindBet",blindBet);
        io.emit("playerHistory",playerHistory);
    })

    socket.on("handle2xChaal",()=>{
      const player = playerHistory.find((p) => p.id=== socket.id);
      console.log(socket.id,":",blindBet);
      if(player){
          player.money-=4*blindBet;
          poolMoney+=4*blindBet;
          blindBet*=2;
          console.log(player.userName+player.money);
      }
      io.emit("poolMoney",poolMoney);
      io.emit(socket.id);
      io.emit("blindBet",blindBet);
      io.emit("playerHistory",playerHistory);
    })

    socket.on("handleBlind",()=>{
      const player = playerHistory.find((p) => p.id=== socket.id);
        console.log(socket.id);
        if(player){
            player.money-=blindBet;
            poolMoney+=blindBet;
            console.log(player.userName+player.money);
        }
        console.log(poolMoney);
        io.emit("poolMoney",poolMoney);
        io.emit(socket.id);
        io.emit("blindBet",blindBet);
        io.emit("playerHistory",playerHistory);
    })

    socket.on("handle2xBlind",()=>{
      const player = playerHistory.find((p) => p.id=== socket.id);
      console.log(socket.id,":",blindBet);
      if(player){
          player.money-=2*blindBet;
          poolMoney+=2*blindBet;
          blindBet*=2;
          console.log(player.userName+player.money);
      }
      io.emit("poolMoney",poolMoney);
      io.emit(socket.id);
      io.emit("blindBet",blindBet);
      io.emit("playerHistory",playerHistory);
    })

    socket.on("handleDone",(winners)=>{
      let numberOfWinners=winners.length;
      let moneyToDistribute=poolMoney/numberOfWinners;
      playerHistory.forEach((player) => {
        const winnerPlayer = winners.find((p) => p=== player.id);
        if(winnerPlayer){
          player.money+=moneyToDistribute;
        }
    });
      poolMoney=0;
      blindBet=bootAmount;
 
      io.emit("poolMoney",poolMoney);
      io.emit(socket.id);
      io.emit("blindBet",blindBet);
      io.emit("playerHistory",playerHistory);
      io.emit("setCompleted");
    })

    socket.on("playerGift",(playerGift)=>{
        const player=playerHistory.find((p)=>p.id===playerGift.id);
        if(player){
          player.money+=playerGift.money;
        }
        io.emit("playerHistory",playerHistory);
    })

    socket.on("tableSetting",(value)=>{
      blindBet=Number(value.bootAmount);
      defaultMoney=Number(value.initialValue);
      bootAmount=blindBet;
      const value2={bootAmount,defaultMoney};
      
      playerHistory.forEach((player) => {
        player.money=defaultMoney;
       
    });

      io.emit("adminSetup",value2);

      console.log(bootAmount,defaultMoney,blindBet);
    })

    


    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      playerHistory = playerHistory.filter((player) => player.id !== socket.id);
    });

    let playerPosition=1;
      
      playerHistory.forEach((player) => {
        player.position=playerPosition;
        playerPosition++;
    });
    io.emit("playerHistory",playerHistory);
  });

  const PORT = process.env.PORT || 9000; // Use PORT from environment or default to 9000
server.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
