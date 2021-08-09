import nc from "next-connect";
import dbConnect from "../../../../config/dbConnect";

import { getUserDetails, updateUserDetails, deleteUser } from "../../../../controllers/authControllers";

import { isAuthenticatedUser, authorizeRoles} from "../../../../middlewares/auth";
import onError from "../../../../middlewares/errors";

const handler = nc({ onError })

dbConnect();

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .get(getUserDetails)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .put(updateUserDetails)

handler
    .use(isAuthenticatedUser, authorizeRoles('admin'))
    .delete(deleteUser)

export default handler;