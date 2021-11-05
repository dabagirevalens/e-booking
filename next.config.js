module.exports = {
  // reactStrictMode: true,

  env: {
    DB_LOCAL_URL: "mongodb://localhost:27017/e-booking",

    DB_URI: 'mongodb+srv://dabagire:2ussy9luzZy9Jq31@e-booking.uk9ed.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

    STRIPE_API_KEY: 'pk_test_51JLkZPJzX7JU3N9eMXeecvmaiyNgwR3xgNBF3qos2iyTwMDBsrLqaSxXuAg5Ox29tc4D6XFFrFK3wmt6kWxDTxcn00bInd1y7A',
    STRIPE_SECRET_KEY: 'sk_test_51JLkZPJzX7JU3N9e9pMXS2r3l8TGdT1DrHtHBV4O8zCczNFDddiPIc52pkT3Sw4fiUUJdzNN0ALXjb0eovg8N5WX00BZUr9MrM',
    STRIPE_WEBHOOK_SECRET: 'whsec_3nkmKkBRrDscaI0B3IcvKUvEmVCDbTpM',
    

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
