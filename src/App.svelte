<script lang="ts">
  import Router from "svelte-spa-router/Router.svelte";
  import { routes } from "./routes";
  import { replace } from "svelte-spa-router";
  import { logout, loaded, user } from "./auth";

  function failed(evt: CustomEvent<{ route: string }>) {
    if (evt.detail.route === "/signup") return replace("/");

    replace("/signup");
  }

  async function doLogout() {
    await logout();
    replace("/signup");
  }
</script>

<main>
  {#if $loaded && $user}
    <a href="#/">Home</a>
    <a href="javascript:void(0)" on:click={doLogout}>Logout</a>
  {/if}
  <Router {routes} on:conditionsFailed={failed} />
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
