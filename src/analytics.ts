import { analytics } from "./init";

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
  analytics.setUserId(id);
}

export function logEvent(name: string, data?: Record<string, string>) {
  analytics.logEvent(name, data);
}
