const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    maxCount: { 
        type: Number,
        required: true
    },
    phone: { 
        type: Number,
        required: true
    },  
    rentperday: {
        type: Number,
        required: true
    },
    imageurls: [],
    currentbookings: [],
    type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
} , {timestamps: true});


const Room = mongoose.model('Room', roomSchema);

module.exports = Room;