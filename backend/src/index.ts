import { WebSocketServer } from 'ws';
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Request } from 'express';
import { terminalConnect } from './controllers/terminal.controller.js';

dotenv.config();

connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
    console.log("Server running at port: ", process.env.PORT);
  });
})
.catch((err) => {
  console.log("MongoDB connection error: ", err);
});

const wss = new WebSocketServer({ port: Number(process.env.WSPORT) || 3000 });
wss.on('connection',(ws,req: Request)=>{
  const cont = req.url.split('/').filter(url => !!url)
  console.log(cont)
  terminalConnect(ws,cont[1])
});