import { io } from "socket.io-client";
import { API_URLS } from "../constants/ApiConfig";

const SERVER_URL = 'http://192.168.0.164:5000'

const socket = io(SERVER_URL, {
    transports: ['websocket']
})

socket.on('connect', () => {
    console.log('Socket conectado con el servidor Flask')
})

socket.on('disconnect', () => {
    console.log('Socket desconectado')
})

export default socket;