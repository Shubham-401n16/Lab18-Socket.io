'use strict';

const io = require('socket.io-client');
const app = io.connect(`http://localhost:3000/csps`);


app.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`picked up order ${payload.orderId}`);
    app.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log(`delivered order ${payload.orderId}`);
    app.emit('delivered', payload);
  }, 3000);
});