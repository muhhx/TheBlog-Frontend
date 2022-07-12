export default {
  BASE_SERVER_URL:
    import.meta.env.VITE_APP_BASE_SERVER_URL || "http://localhost:5000",
  GOOGLE_CLIENT_ID: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID as string,
  GOOGLE_OAUTH_REDIRECT_URL: import.meta.env
    .VITE_APP_GOOGLE_OAUTH_REDIRECT_URL as string,
};
