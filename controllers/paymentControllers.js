import Room from '../models/room';
import User from '../models/user';
import Booking from '../models/booking';

import getRawBody from 'raw-body'


import catchAsyncErrors from '../middlewares/catchAsyncErrors';
import absoluteUrl from 'next-absolute-url'

const stripe = require('stripe')('sk_test_51JFOUzJt8PjGxb7vpU8kzIV8ayFecSJ2JmnIyMAQLknFAAVOe3V4SRHOoQIUimpdhTb7q31B5i5jkeIj8FXvPHlC00mpH0aw9E');

//Generate stripe checkout session => /api/checkout_session/:roomId
const stripeCheckoutSession = catchAsyncErrors(async (req, res) => {

    const { origin } = absoluteUrl(req);

    // Get room details 
    const room = await Room.findById(req.query.roomId);


    const { checkInDate, checkOutDate, daysOfStay } = req.query;

    // Create stripe checkout session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${origin}/bookings/me`,
        cancel_url: `${origin}/room/${room._id}`,
        customer_email: req.user.email,
        client_reference_id: req.query.roomId,
        metadata: { checkInDate, checkOutDate, daysOfStay },
        line_items: [
            {
                name: room.name,
                images: [`${room.images[0].url}`],
                amount: req.query.amount * 100,
                currency: 'usd',
                quantity: 1
            }
        ]
    })

    res.status(200).json(session)

})


// Create new booking after payment => /api/booking/webhook

const webhookCheckout = catchAsyncErrors(async (req, res) => {

    const rawBody = await getRawBody(req);

    try {

        const signature = req.headers['stripe-signature'];

        const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)

        // console.log(event)

        if (event.type === 'checkout.session.completed') {

            const session = event.data.object;

            const room = session.client_reference_id;
            const user = (await User.findOne({ email: session.customer_email }))._id;

            const amountPaid = session.amount_total;

            const paymentInfo = {
                id: session.payment_intent,
                status: session.payment_status
            }

            const checkInDate = session.metadata.checkInDate;
            const checkOutDate = session.metadata.checkOutDate;
            const daysOfStay = session.metadata.daysOfStay;

            const booking = await Booking.create({
                room,
                user,
                checkInDate,
                checkOutDate,
                daysOfStay,
                amountPaid,
                paymentInfo,
                paidAt: Date.now(),
            });

            console.log(booking);

            res.status(200).json({ success: true })

        }

    } catch (error) {
        console.log("Error in stripe checkout payment => ", error);
    }

})

export {
    stripeCheckoutSession,
    webhookCheckout,
}