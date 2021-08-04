import cloudinary from 'cloudinary';
import User from '../models/user';

import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ApiFeatures from '../utils/apiFeatures';


//setting up cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//User register => /api/auth/register
const userRegister = catchAsyncErrors(async (req, res) => {

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, 
        {
        folder : 'e-booking/avatars',
        width : '150',
        crop : 'scale'
    })


    const { name, email, password  } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar :{
            public_id : result.public_id,
            url : result.secure_url
        }
    });


    res.status(200).json({
        success : true,
        message : 'Account created successfully',
        user
    });

})



export {
    userRegister,
}