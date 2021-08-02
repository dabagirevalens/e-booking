import Room from '../models/room';

import ErrorHandler from '../utils/errorHandler';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';

//Get all rooms => /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {
    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        count: rooms.length,
        rooms
    })

})

//Get room details => /api/rooms/:id
const getSingleRoom = catchAsyncErrors(async (req, res, next) => {


    let id = req.query.id;

    const room = await Room.findById(id);

    if (!room) {
        return next(new ErrorHandler(`Room Not Found With This ID: ${id}`, 404));
    }

    res.status(200).json({
        success: true,
        room
    })

})


//Create new room => /api/rooms
const newRoom = catchAsyncErrors(async (req, res) => {

    const room = await Room.create(req.body);

    res.status(200).json({
        success: true,
        room
    })

})

//Update room details => /api/rooms/:id
const updateRoom = catchAsyncErrors(async (req, res) => {


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


})



//Delete room => /api/rooms/:id
const deleteRoom = catchAsyncErrors(async (req, res) => {


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


})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom
}