import nc from 'next-connect';
import dbConnect from '../../../../config/dbConnect'

import { getRoomReviews, deleteRoomReview } from '../../../../controllers/roomControllers'

import onError from '../../../../middlewares/errors';

import { isAuthenticatedUser, authorizeRoles} from '../../../../middlewares/auth'

const handler = nc({ onError });

dbConnect();


handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getRoomReviews);

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteRoomReview);


export default handler;