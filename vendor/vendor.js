'use strict';

const io = require('socket.io-client');
const app = io.connect('http://localhost:3000/csps');
const faker = require('faker');


setInterval(() => {
    let customerOrder = {
        time: faker.date.recent(),
        store: '1-206-flowers',
        orderId: faker.random.number(),
        customer: faker.name.findName(),
        address: `${faker.address.streetAddress()}, ${faker.address.city()}, ${faker.address.zipCode()}`,
    };
  app.emit('join', customerOrder.store);
  app.emit('pickup',customerOrder);
}, 5000);

app.on('delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderId}`);
});