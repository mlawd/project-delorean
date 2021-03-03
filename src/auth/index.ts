import firebase from "firebase/app";
import "firebase/auth";
import "firebase/analytics";
import { get, writable } from "svelte/store";
import { CONFIG } from "../config";

firebase.initializeApp(CONFIG.firebase);
firebase.analytics();

interface User {
  uid: string;
  email: string;
  displayName: string;
}
const _user = writable<User>(null);

const auth = firebase.auth();

const _loaded = writable(false);

auth.onAuthStateChanged(user => {
  if (!get(_loaded)) _loaded.set(true);
  _user.set(user);
});

export const user = { subscribe: _user.subscribe };
export const loaded = { subscribe: _loaded.subscribe };

export async function waitLoaded() {
  return new Promise<void>(resolve => {
    if (!get(_loaded)) {
      _loaded.subscribe(val => {
        if (val) resolve();
      });
    } else {
      resolve();
    }
  });
}

export async function googleAuth() {
  var result = await auth.signInWithPopup(
    new firebase.auth.GoogleAuthProvider()
  );

  _user.set(result.user);
}

export async function signup(email: string, password: string) {
  var result = await auth.createUserWithEmailAndPassword(email, password);

  _user.set(result.user);
}

export async function signin(email: string, password: string) {
  var result = await auth.signInWithEmailAndPassword(email, password);

  _user.set(result.user);
}

export async function logout() {
  return auth.signOut();
}
