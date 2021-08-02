import Room from '../models/room';
import ErrorHandler from '../utils/errorHandler';

//Get all rooms => /api/rooms
const allRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        res.status(200).json({
            success: true,
            count: rooms.length,
            rooms
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//Get room details => /api/rooms/:id
const getSingleRoom = async (req, res, next) => {
    try {

        let id = req.query.id;

        const room = await Room.findById(id);

        if (!room) {
            return next(new ErrorHandler(`Room Not Found With This ID: ${id}`, 404));
        }

        res.status(200).json({
            success: true,
            room
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


//Create new room => /api/rooms
const newRoom = async (req, res) => {
    try {
        const room = await Room.create(req.body);

        res.status(200).json({
            success: true,
            room
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//Update room details => /api/rooms/:id
const updateRoom = async (req, res) => {
    try {

        let id = req.query.id;

        let room = await Room.findById(id);

        if (!room) {
            return next(new ErrorHandler(`Room Not Found With This ID: ${id}`, 404));
        }

        room = await Room.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })

        res.status(200).json({
            success: true,
            room
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}



//Delete room => /api/rooms/:id
const deleteRoom = async (req, res) => {
    try {

        let id = req.query.id;

        const room = await Room.findById(id);

        if (!room) {
            return next(new ErrorHandler(`Room Not Found With This ID: ${id}`, 404));
        }

        room.remove();

        res.status(200).json({
            success: true,
            message: 'Room was deleted successfully.'
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}