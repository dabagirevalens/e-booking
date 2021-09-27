import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect'

import { userRegister } from '../../../controllers/authControllers'

import onError from '../../../middlewares/errors';

const handler = nc({ onError });

dbConnect();

export const config = {
    api: {
      bodyParser: {
        sizeLimit: '5mb',
      },
    },
  }
  

handler.post(userRegister);

export default handler;