const dev = {
  STRIPE_KEY: "pk_test_RnMKtb4a1zhvvIyNzdQuISs9",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-onmhwbuzikt1"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://co3h7w45ni.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_duXFFUYU0",
    APP_CLIENT_ID: "6ekcu39596kfr1v64sej6nla8d",
    IDENTITY_POOL_ID: "eu-west-1:99eda5f3-6ffc-4c90-aac8-42d6b550380d"
  }
};

const prod = {
  STRIPE_KEY: "YOUR_STRIPE_PROD_PUBLIC_KEY",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-12lkgasr9q920"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://5mo2ti5l5l.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_pakVwtGw2",
    APP_CLIENT_ID: "5v7qek21sphsv0afgv259gv6qc",
    IDENTITY_POOL_ID: "eu-west-1:8075a8dc-8f3e-4cfc-8389-c984c60a7c6a"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

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