const isDevelopment = import.meta.env.DEV;

const isStaging =
  isDevelopment || import.meta.env.VITE_ENVIRONMENT === "staging";

const isProduction =
  !isStaging && import.meta.env.VITE_ENVIRONMENT === "production";

export const config = {
  isStaging,
  isProduction,
  isDevelopment,
  colors: {
    primary: "#3498db",
  },
  google: {
    clientId:
      "878713143490-mp0bgai23nnma7fved364ghfl5ib2pjm.apps.googleusercontent.com",
    analyticsId: "",
  },
  keys: {
    access: "SKILLSYNC__ACCESS__TOKEN",
  },
  baseURL: import.meta.env.VITE_API_URL,
};
