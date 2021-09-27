module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/booking",

    DB_URI : 'mongodb+srv://valensdabagire:@dv19092003ds@@e-booking.x9of9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    STRIPE_API_KEY:
      "pk_test_51JLkZPJzX7JU3N9eMXeecvmaiyNgwR3xgNBF3qos2iyTwMDBsrLqaSxXuAg5Ox29tc4D6XFFrFK3wmt6kWxDTxcn00bInd1y7A",
    STRIPE_SECRET_KEY:
      "sk_test_51JLkZPJzX7JU3N9e9pMXS2r3l8TGdT1DrHtHBV4O8zCczNFDddiPIc52pkT3Sw4fiUUJdzNN0ALXjb0eovg8N5WX00BZUr9MrM",
    STRIPE_WEBHOOK_SECRET: "whsec_g9kbraUUp6NZcCj3eJsIaBFMkAfbOaIg",

    CLOUDINARY_CLOUD_NAME: "e-booking",
    CLOUDINARY_API_KEY: "972493846974469",
    CLOUDINARY_API_SECRET: "ViACrUqWoWbcJIbKgZUa_Fc-Vew",

    SMTP_HOST: "smtp.mailtrap.io",
    SMTP_PORT: "2525",
    SMTP_USER: "1b5ccdaf0b9f51",
    SMTP_PASSWORD: "ebd7331167e075",
    SMTP_FROM_NAME: "e-booking",
    SMTP_FROM_EMAIL: "noreply@e-booking.com",

    NEXTAUTH_URL: 'https://e-booking.vercel.app'
  },

  images: {
    domains: ["res.cloudinary.com"],
  },
};
