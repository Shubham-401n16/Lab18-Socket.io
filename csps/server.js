'use strict';

const sio = require('socket.io');
const server = sio(3000);


const csps = server.of('/csps');

csps.on('connection',(socket)=>{
    console.log('connected to socket', socket.id);

    socket.on('join', (room) => {
        socket.join(room);
        console.log(`socket ${socket.id} joined room ${room}`);
      });
    
      socket.on('pickup', (payload) => {
          Object.keys(payload).forEach((key) => {
            console.log(`${key}: ${payload[key]}`);
          });
          console.log();
    
        csps.emit('pickup', payload);
      });
    
      socket.on('in-transit', (payload) => {
        console.log('in-transit', payload.orderId);
        csps.to(payload.store).emit('in-transit', payload);
      });
    
      socket.on('delivered', (payload) => {
        console.log('delivered', payload.orderId);
        console.log();
    
        csps.to(payload.store).emit('delivered', payload);

});
});