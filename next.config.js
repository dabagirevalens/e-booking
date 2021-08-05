module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/booking",

    CLOUDINARY_CLOUD_NAME : 'e-booking',
    CLOUDINARY_API_KEY: '972493846974469',
    CLOUDINARY_API_SECRET: 'ViACrUqWoWbcJIbKgZUa_Fc-Vew',

    SMTP_HOST : 'smtp.mailtrap.io',
    SMTP_PORT : '2525',
    SMTP_USER : '1b5ccdaf0b9f51',
    SMTP_PASSWORD : 'ebd7331167e075',
    SMTP_FROM_NAME : 'e-booking',
    SMTP_FROM_EMAIL : 'noreply@e-booking.com'

  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};
