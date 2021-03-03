<script lang="ts">
  import Button from "../components/Button.svelte";
  import { googleAuth } from "../auth";
  import { replace } from "svelte-spa-router";

  async function google() {
    await googleAuth();
    replace("/");
  }
</script>

<main>
  <Button on:click={google}>Login with google</Button>
</main>
