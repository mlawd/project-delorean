// @ts-ignore
const env: Record<string, string | undefined> = ENV;

export const CONFIG = {
  prod: env.prod,
  firebase: {
    apiKey: env.APP_FIREBASE_API_KEY,
    authDomain: env.APP_FIREBASE_AUTH_DOMAIN,
    projectId: env.APP_FIREBASE_PROJECT_ID,
    storageBucket: env.APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.APP_FIREBASE_APP_ID,
    measurementId: env.APP_FIREBASE_MEASUREMENT_ID,
  },
};
