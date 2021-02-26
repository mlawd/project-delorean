import firebase from "firebase/app";
import "firebase/auth";
import { get, writable } from "svelte/store";

const config = {
  apiKey: "AIzaSyBRev6BBJ0nyIPvJTh60m8nHJpG1DvKEBM",
  authDomain: "project-delorean-59706.firebaseapp.com",
  projectId: "project-delorean-59706",
  storageBucket: "project-delorean-59706.appspot.com",
  messagingSenderId: "557934398821",
  appId: "1:557934398821:web:028fe8104191d3566d658c",
  measurementId: "G-6EB7NVFWCQ",
};

firebase.initializeApp(config);

interface User {
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
