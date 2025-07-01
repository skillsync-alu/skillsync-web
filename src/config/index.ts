const isDevelopment = import.meta.env.DEV;

const isStaging =
  isDevelopment || import.meta.env.VITE_ENVIRONMENT === "staging";

const isProduction =
  !isStaging && import.meta.env.VITE_ENVIRONMENT === "production";

export const config = {
  isStaging,
  isProduction,
  isDevelopment,
  google: { clientId: "", analyticsId: "" },
  keys: {
    access: "SKILLSYNC__ACCESS__TOKEN",
  },
  baseURL: import.meta.env.VITE_API_URL,
};
