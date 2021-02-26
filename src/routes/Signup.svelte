<script lang="ts">
  import { signup, googleAuth, signin } from "../auth";
  import { replace } from "svelte-spa-router";

  export let email = "";
  export let password = "";

  async function submitSignup() {
    await signup(email, password);
    replace("/");
  }

  async function submitLogin() {
    await signin(email, password);
    replace("/");
  }

  async function google() {
    await googleAuth();
    replace("/");
  }
</script>

<main>
  <input type="text" placeholder="Email" bind:value={email} />
  <input type="password" placeholder="Password" bind:value={password} />
  <button on:click={submitSignup}>Signup</button>
  <button on:click={submitLogin}>Log in</button>
  <hr />
  <button on:click={google}>Login with google</button>
</main>
