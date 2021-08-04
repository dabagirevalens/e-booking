import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { userRegister } from '../../../controllers/authControllers'

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

handler.post(userRegister);

export default handler;