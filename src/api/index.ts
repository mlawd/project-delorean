import firebase from "firebase/app";
import "firebase/firestore";
import { get, writable } from "svelte/store";
import { user } from "../auth";

const db = firebase.firestore();

interface Log {
  id: string;
  start: number;
  end?: number;
  diff?: number;
}

const _loading = writable(true);
const _logs = writable<Log[]>([], set => {
  const { uid } = get(user);
  db.collection("timelogs")
    .where("user_id", "==", uid)
    .where("end", "!=", null)
    .onSnapshot(snapshot => {
      const docs: Log[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();

        docs.push({
          id: doc.id,
          start: data.start,
          end: data.end,
          diff: data.diff,
        });
      });

      set(docs);
    });
});

const _currentLog = writable<Log>(null);

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
    await db
      .collection("timelogs")
      .doc(log.id)
      .update({
        end,
        diff: end - log.start,
      });

    _currentLog.set(null);
  }
}

export const logs = { subscribe: _logs.subscribe };
export const loadingLogs = { subscribe: _loading.subscribe };
export const currentLog = { subscribe: _currentLog.subscribe };
