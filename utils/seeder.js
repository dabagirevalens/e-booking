const mongoose = require('mongoose');

const Room  = require ('../models/room');

const rooms = require( '../data/rooms.json');

mongoose.connect('mongodb+srv://dabagire:2ussy9luzZy9Jq31@e-booking.uk9ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const seedRooms = async () => {
    try {
        
        await Room.deleteMany();
        console.log('Rooms are deleted');

        await Room.insertMany(rooms);
        console.log('All rooms are added');

        process.exit();

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedRooms();