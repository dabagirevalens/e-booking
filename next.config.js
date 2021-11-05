module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/e-booking",

    DB_URI: 'mongodb+srv://dabagire:2ussy9luzZy9Jq31@e-booking.uk9ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    STRIPE_API_KEY: 'pk_test_51JsP0GFceaz50RLnZcqDvTMLZ0DJBI2qEz6EItRzcUI2C5r5zlGDM11j49ctH5XYbAkwo8sGf9H4tFmbkThXGKcH002kV2a2BS',
    STRIPE_SECRET_KEY: 'sk_test_51JsP0GFceaz50RLnYYwqwqAchGktK4tQAS59wy67wVTC1mfRdYuv3GwiZXEGNAOLqDKqndsWqa6TrR25nDrv1TuD007vsQjBt7',
    STRIPE_WEBHOOK_SECRET: 'whsec_vzqBx9v1M6urhopuber5emeafEELfjVr',
    

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
