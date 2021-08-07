module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/booking",

    STRIPE_API_KEY:
      "pk_test_51JLkf4F2Ig7LH22dOF8HQLaflUYgBvmYG4DgvdhsEMMhBwtBYfpFcvCr2XpzZNUCLZMlvc6IlTMgbgKUwO4xVXus00h6S1OVmJ",
    STRIPE_SECRET_KEY:
      "sk_test_51JLkf4F2Ig7LH22dBTiOg44ELu8CzwnFVt0Pv1kFtM8mEMt010Tyk7PxQNcorFfsgL9f1ZjPi6qjnKDBP1enLDmm00GuoGMxg7",
    STRIPE_WEBHOOK_SECRET: "whsec_2aaBJAEvjbkAJJCcTfO4FRKQpVkSMeoy",

    CLOUDINARY_CLOUD_NAME: "e-booking",
    CLOUDINARY_API_KEY: "972493846974469",
    CLOUDINARY_API_SECRET: "ViACrUqWoWbcJIbKgZUa_Fc-Vew",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "1b5ccdaf0b9f51",
    SMTP_PASSWORD: "ebd7331167e075",
    SMTP_FROM_NAME: "e-booking",
    SMTP_FROM_EMAIL: "noreply@e-booking.com",
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};
