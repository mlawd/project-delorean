import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { CONFIG } from "./config";

firebase.initializeApp(CONFIG.firebase);

export const auth = firebase.auth();
export const GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
export const analytics = firebase.analytics();
