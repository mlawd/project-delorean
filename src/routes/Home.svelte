<script lang="ts">
  import { logs, currentLog, startLog, stopLog } from "../api";

  export let updating = false;

  async function start() {
    updating = true;
    await startLog(Date.now());
    updating = false;
  }

  async function stop() {
    updating = true;
    await stopLog(Date.now());
    updating = false;
  }
</script>

<main>
  Hello {$logs.length}
  {#if $currentLog}
    <button on:click={stop} disabled={updating}>End Log</button>
  {:else}
    <button on:click={start} disabled={updating}>Start Log</button>
  {/if}
</main>
