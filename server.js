import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { io } from "socket.io-client";

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// URL do WebSocket da PocketOption
const WS_URL = "wss://api-in.pocketoption.com:8095/socket.io/?EIO=3&transport=websocket";

// Conexão com o WebSocket
const socket = io(WS_URL, {
  transports: ["websocket"], // força uso de WebSocket puro
});

// Eventos do WebSocket
socket.on("connect", () => {
  console.log("? Conectado ao WebSocket da PocketOption!");
});

socket.on("disconnect", () => {
  console.log("? Desconectado do WebSocket.");
});

socket.on("connect_error", (err) => {
  console.error("?? Erro na conexão com WebSocket:", err.message);
});

// Rota teste
app.get("/", (req, res) => {
  res.send("?? Backend PocketOption rodando no Render!");
});

// Exemplo de endpoint saldo
app.post("/saldo", (req, res) => {
  const { ssid } = req.body;
  // Aqui você pode usar o socket para enviar algo ao servidor WS
  res.json({ saldo: 1000, ssidRecebido: ssid });
});

// Porta dinâmica do Render
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
