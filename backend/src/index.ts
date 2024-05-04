import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
});

app.use(cors( {origin: "*"}))

app.get("/", (req, res) => {
  res.send(`<script type="module">import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";const socket = io();socket.on("connect", () => {console.log(socket.id);});</script><h1>Hello</h1>`)
})

io.on("connection", (socket) => {
  // ...
  console.log("hello l gg")
});


httpServer.listen(3000, () => { console.log("Serever listening at port 3000") });