import firebase from "firebase/app";
import "firebase/firestore";
import { get, writable } from "svelte/store";
import { user } from "../auth";

const db = firebase.firestore();

export interface Log {
  id: string;
  start: number;
  end?: number;
}

const _loading = writable(true);
const _currentLog = writable<Log>(null);

export function subscribeToWeekLogs() {
  const { uid } = get(user);
  const logs = writable<Record<string, Log>>({});
  const today = new Date();
  const monday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - today.getDay() + 1
  );

  db.collection("timelogs")
    .where("user_id", "==", uid)
    .where("start", ">=", monday.getTime())
    .onSnapshot(data => {
      data.docs.forEach(doc => {
        var d = doc.data();

        logs.update(cur => {
          cur[doc.id] = {
            id: doc.id,
            start: d.start,
            end: d.end,
          };

          if (!d.end) {
            _currentLog.set(cur[doc.id]);
          }

          return cur;
        });
      });
    });

  return { subscribe: logs.subscribe };
}

export async function startLog(start: number) {
  if (!get(_currentLog)) {
    const { uid } = get(user);
    const doc = await db.collection("timelogs").add({
      start,
      user_id: uid,
    });

    _currentLog.set({
      id: doc.id,
      start,
    });
  }
}

export async function stopLog(end: number) {
  const log = get(_currentLog);
  if (!!log) {
    await db.collection("timelogs").doc(log.id).update({
      end,
    });

    _currentLog.set(null);
  }
}

export const loadingLogs = { subscribe: _loading.subscribe };
export const currentLog = { subscribe: _currentLog.subscribe };
