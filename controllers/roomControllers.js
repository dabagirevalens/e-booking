import Room from '../models/room';
import Booking from '../models/booking';

import ErrorHandler from '../utils/errorHandler';

import catchAsyncErrors from '../middlewares/catchAsyncErrors';

import ApiFeatures from '../utils/apiFeatures';
import cloudinary from "cloudinary";

//setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//Get all rooms => /api/rooms
const allRooms = catchAsyncErrors(async (req, res) => {

    const resPerPage = 4;
    const roomsCount = await Room.countDocuments();

    const apiFeatures = new ApiFeatures(Room.find(), req.query)
        .search()
        .filter()

    let rooms = await apiFeatures.query;   
    let filteredRoomsCount = rooms.length; 

    apiFeatures.pagination(resPerPage);
    rooms = await apiFeatures.query;

    res.status(200).json({
        success: true,
        roomsCount,
        resPerPage,
        filteredRoomsCount,
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
    

    const images = req.body.images;

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "e-booking/rooms"
        })

        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })

    }

    req.body.images = imagesLinks;
    req.body.user = req.user._id;

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

    if(req.body.images) {
        
        // delete images associated with room

        for (let i = 0; i < room.images.length; i++) {
            await cloudinary.v2.uploader.destroy(room.images[i].public_id)
        }

        let imagesLinks = [];   

        for (let i = 0; i < req.body.images.length; i++) {
        
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "e-booking/rooms"
            })
    
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            })
    
        }
    
        req.body.images = imagesLinks;

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

    // delete images associated with room

    for (let i = 0; i < room.images.length; i++) {
        await cloudinary.v2.uploader.destroy(room.images[i].public_id)
    }

    room.remove();

    res.status(200).json({
        success: true,
        message: 'Room was deleted successfully.'
    })


})

// Create new room review => /api/review

const createRoomReview = catchAsyncErrors(async (req, res) => {

    const { rating, comment, roomId } = req.body;

    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment
    }

    const room = await Room.findById(roomId);

    let roomReviews = room.reviews;

    const isReviewed = roomReviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {

        roomReviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating
            }
        })

    } else {
        roomReviews.push(review)
        room.numOfReviews = roomReviews.length
    }

    room.ratings = roomReviews.reduce((acc, item) =>item.rating + acc, 0) / room.numOfReviews

    await room.save({ validateBeforeSave : false });

    res.status(200).json({success:true})


})

// Create new room review => /api/review/check_roomreview_availability

const checkReviewAvailability = catchAsyncErrors(async (req, res) => {

    const { roomId } = req.query;

    const bookings = await Booking.find({ user : req.user._id, room : roomId });

    console.log(bookings)

    let isReviewAvailable = false;

    if(bookings.length > 0) isReviewAvailable = true;

    res.status(200).json({
        success:true,
        isReviewAvailable
    })


})

// Get all rooms - ADMIN   =>   /api/admin/rooms
const allAdminRooms = catchAsyncErrors(async (req, res) => {

    const rooms = await Room.find();

    res.status(200).json({
        success: true,
        rooms
    })

})

// Get all room reviews - ADMIN   =>   /api/admin/reviews/:id
const getRoomReviews = catchAsyncErrors(async (req, res) => {

    const room = await Room.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews : room.reviews,
    })

})

// Delete room - ADMIN   =>   /api/admin/reviews/:id
const deleteRoomReview = catchAsyncErrors(async (req, res) => {

    const room = await Room.findById(req.query.roomId);

    const reviews = room.reviews.filter(review => review._id.toString() !== req.query.id.toString())

    const numOfReviews = reviews.length;

    const ratings = room.reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length

    await Room.findByIdAndUpdate(req.query.roomId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true
    })

})

export {
    allRooms,
    newRoom,
    getSingleRoom,
    updateRoom,
    deleteRoom,
    createRoomReview,
    checkReviewAvailability,
    allAdminRooms,
    getRoomReviews,
    deleteRoomReview
}