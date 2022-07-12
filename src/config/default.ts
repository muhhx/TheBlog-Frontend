export default {
  BASE_SERVER_URL:
    // @ts-ignore
    process.env.VITE_APP_BASE_SERVER_URL || "http://localhost:5000",
  // @ts-ignore
  GOOGLE_CLIENT_ID: process.env.VITE_APP_GOOGLE_CLIENT_ID as string,
  // @ts-ignore
  GOOGLE_OAUTH_REDIRECT_URL: process.env
    .VITE_APP_GOOGLE_OAUTH_REDIRECT_URL as string,
};
