<script lang="ts">
  import Router from "svelte-spa-router/Router.svelte";
  import { routes } from "./routes";
  import { replace } from "svelte-spa-router";
  import { logout, loaded, user } from "./auth";
  import LogoutIcon from "svelte-material-icons/Logout.svelte";

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
  <h1>Time Logger</h1>
  {#if $loaded && $user}
    <button on:click={doLogout} title="Log out">
      <LogoutIcon size="20px" color="white" />
    </button>
  {/if}
  <Router {routes} on:conditionsFailed={failed} />
</main>

<style lang="scss">
  main {
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  main {
    max-width: 100%;
  }

  @media (min-width: 640px) {
    main {
      max-width: 640px;
    }
  }

  button {
    position: fixed;
    top: 10px;
    right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: none;
    background-color: var(--primary);

    &:hover {
      cursor: pointer;
    }
  }
</style>
