import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('X Desconectado: ' + socket.id);
  });
  socket.on('boas-vindas', (data) => {
    console.log(data);
  });
  socket.on('name', (data) => {
    console.log(data);
    socket.emit('result', `Olá ${data.name} Seja bem vindo!`);
  });
});
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
});

httpServer.listen(3333, () => {
  console.log(`Servidor rodando na porta 3333 `);
});
