import nc from "next-connect";
import dbConnect from "../../../config/dbConnect";

import { checkRoomBookedDates } from "../../../controllers/bookingControllers";

import onError from "../../../middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.get(checkRoomBookedDates);

export default handler;
