module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/e-booking",

    DB_URI: 'mongodb+srv://dabagire:2ussy9luzZy9Jq31@e-booking.uk9ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    // STRIPE_API_KEY:
    //   "pk_test_51JLkf4F2Ig7LH22dOF8HQLaflUYgBvmYG4DgvdhsEMMhBwtBYfpFcvCr2XpzZNUCLZMlvc6IlTMgbgKUwO4xVXus00h6S1OVmJ",
    // STRIPE_SECRET_KEY:
    //   "sk_test_51JLkf4F2Ig7LH22dBTiOg44ELu8CzwnFVt0Pv1kFtM8mEMt010Tyk7PxQNcorFfsgL9f1ZjPi6qjnKDBP1enLDmm00GuoGMxg7",
    // STRIPE_WEBHOOK_SECRET: "we_1Jqk7NF2Ig7LH22dOkkaE9OB",
    STRIPE_PUBLIC_KEY:'pk_test_51JFOUzJt8PjGxb7vBnax4XXGVaMf9G78be5UMwj6EotdLe6mOOI6931bptYCxh0hh8ui6fsRHEXHU9u2nMNRiWEQ00GNPHuJFn',
    STRIPE_PRIVATE_KEY:'sk_test_51JFOUzJt8PjGxb7vpU8kzIV8ayFecSJ2JmnIyMAQLknFAAVOe3V4SRHOoQIUimpdhTb7q31B5i5jkeIj8FXvPHlC00mpH0aw9E',
    STRIPE_WEBHOOK_SECRET : 'whsec_S2T6pE4bJMP62Ih6NKnDRRokCpaI5YrC',
    // STRIPE_WEBHOOK_SECRET: "whsec_2aaBJAEvjbkAJJCcTfO4FRKQpVkSMeoy",

    CLOUDINARY_CLOUD_NAME: "images-bucket",
    CLOUDINARY_API_KEY: "972493846974469",
    CLOUDINARY_API_SECRET: "ViACrUqWoWbcJIbKgZUa_Fc-Vew",

    USER_EMAIL: "devsearch.info@gmail.com",
    USER_PASSWORD: "@d2021s@",

    NEXTAUTH_URL: 'https://e-booking.vercel.app'
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
  generateBuildId: async () => {
    return 'my-build-id'
  },
};
