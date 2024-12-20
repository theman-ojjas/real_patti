import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io("https://real-patti.onrender.com/");
    }
    return socket;
};
