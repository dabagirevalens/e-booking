const mongoose = require('mongoose');

const Room  = require ('../models/room');

const rooms = require( '../data/rooms.json');

mongoose.connect(`mongodb+srv://vdabagire:husky@dv@e-booking.x9of9.mongodb.net/e-booking?retryWrites=true&w=majority`, {
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

    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedRooms();