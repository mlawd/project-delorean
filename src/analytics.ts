import firebase from "firebase/app";
import "firebase/analytics";
import { CONFIG } from "./config";

const analytics = CONFIG.prod && firebase.analytics();

export function logLogin(uid: string) {
  logEvent("login", { uid });
}

export function logStart() {
  logEvent("log_start");
  logEvent("interaction", { type: "log_start" });
}

export function logEnd() {
  logEvent("log_end");
  logEvent("interaction", { type: "log_end" });
}

export function setUserId(id: string) {
  if (analytics) analytics.setUserId(id);
}

export function logEvent(name: string, data?: Record<string, string>) {
  if (analytics) {
    analytics.logEvent(name, data);
  }
}
