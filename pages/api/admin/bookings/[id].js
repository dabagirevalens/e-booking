import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import { deleteBooking } from "../../../../controllers/bookingControllers";

import { isAuthenticatedUser, authorizeRoles} from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteBooking);

export default handler;