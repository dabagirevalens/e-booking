import catchAsyncErrors from './catchAsyncErrors'
import errorHandler from '../utils/errorHandler'

import { getSession  } from 'next-auth/client'

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    const session = await getSession({ req });

    if(!session) { 
        return next(new errorHandler('Login first to access this resource.', 401))
    }

    req.user = session.user
    next();

})

export {
    isAuthenticatedUser
}