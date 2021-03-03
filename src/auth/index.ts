import { get, writable } from "svelte/store";
import { logLogin, setUserId } from "../analytics";
import { auth, GoogleAuthProvider } from "../init";

interface User {
  uid: string;
  email: string;
  displayName: string;
}
const _user = writable<User>(null);

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
  var result = await auth.signInWithPopup(new GoogleAuthProvider());

  _user.set(result.user);
  setUserId(result.user.uid);
  logLogin(result.user.uid);
}

export async function logout() {
  return auth.signOut();
}
