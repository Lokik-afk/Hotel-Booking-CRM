const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');


router.post('/bookroom', async (req, res) => {
    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays,
    } = req.body;

    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionid: '1234'
        });

        const booking = await newbooking.save();
        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
            bookingid: booking._id,
            fromdate: moment(fromdate).format('DD-MM-YYYY'),
            todate: moment(todate).format('DD-MM-YYYY')
        });
        roomtemp.userid = userid;
        roomtemp.status = booking.status;

        await roomtemp.save();

        res.send('Room Booked Successfully');
    } catch (error) {
        // Handle error here
        console.error(error); // Log the error for debugging purposes
        res.status(400).json({ message: "An error occurred while booking the room." });
    }
});


module.exports = router;
