import User from '../models/user';
import ErrorHandler from '../utils/errorHandler';
import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import ApiFeatures from '../utils/apiFeatures';

//User register => /api/auth/register
const userRegister = catchAsyncErrors(async (req, res) => {

    // await User.deleteMany();
    // console.log('cool')

    const { name, email, password  } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar :{
            public_id : 'PUBLIC_ID',
            url : 'URL'
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