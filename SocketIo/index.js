import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log(`socket conectado: ${socket}`);
  console.log(`socket conectado: ${socket.id}`);
});
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

httpServer.listen(3333, () => {
  console.log(`Servidor rodando na porta 3333 `);
});
