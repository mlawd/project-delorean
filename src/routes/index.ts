import { wrap } from "svelte-spa-router/wrap";
import { get } from "svelte/store";
import { user, waitLoaded } from "../auth";
import Home from "./Home.svelte";
import Signup from "./Signup.svelte";

export const routes = {
  "/": wrap({
    component: Home,
    conditions: [
      async () => {
        await waitLoaded();
        return !!get(user);
      },
    ],
  }),
  "/signup": wrap({
    component: Signup,
    conditions: [
      async () => {
        await waitLoaded();
        return !get(user);
      },
    ],
  }),
};
