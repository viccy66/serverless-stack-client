export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    STRIPE_KEY: "pk_test_RnMKtb4a1zhvvIyNzdQuISs9",
    s3: {
      REGION: "eu-west-1",
      BUCKET: "notes-tuto"
    },
    apiGateway: {
      REGION: "eu-west-1",
      URL: "https://721nylw7sf.execute-api.eu-west-1.amazonaws.com/prod"
    },
    cognito: {
      REGION: "eu-west-1",
      USER_POOL_ID: "eu-west-1_s9iXRLjEa",
      APP_CLIENT_ID: "51lvfhjg3u0cn7r44himjmjobr",
      IDENTITY_POOL_ID: "eu-west-1:ee4d5541-6a29-4b44-a9bf-479df23214c7"
    }
};