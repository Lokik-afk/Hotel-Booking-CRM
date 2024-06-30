const express = require('express');


const App = express();

const roomsRoute = require('./routes/roomsRoute');
const usersRoute = require('./routes/usersRoute');
const bookingsRoute = require('./routes/bookingsRoute');

App.use(express.json());

App.use('/api/rooms', roomsRoute);
App.use('/api/users', usersRoute);
App.use('/api/bookings', bookingsRoute);

const dbConfig = require('./db.js');

const PORT = process.env.PORT || 9000;

App.listen(PORT,()=> console.log(`Server is running on port ${PORT}`));