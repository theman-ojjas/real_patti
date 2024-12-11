const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // React app URL
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
const defaultMoney=1000;
var poolMoney=0;

  io.on("connection",(socket)=>{
    t++;
    console.log("New Client Connected",socket.id,t);

    

    socket.on("userName",(userName)=>{
        const player={userName,money:defaultMoney,id:socket.id}
        console.log(`Username: ${player.userName}`,socket.id);
        playerHistory.push(player);

        socket.emit("playerName",userName);
        io.emit("playerHistory",playerHistory);
        io.emit("poolMoney",poolMoney);
    })

    socket.on("handleStart", () => {
        playerHistory.forEach((player) => {
            player.money-=bootAmount;
            poolMoney+=bootAmount;
        });
        io.emit("poolMoney",poolMoney);
        io.emit("playerHistory",playerHistory);
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
      io.emit("playerHistory",playerHistory);
    })

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
      playerHistory = playerHistory.filter((player) => player.id !== socket.id);
    });
    io.emit("playerHistory",playerHistory);
  });

  server.listen(9000, () => console.log("Server started on PORT 9000"));