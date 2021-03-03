<script lang="ts">
  import { currentLog, startLog, stopLog, subscribeToWeekLogs } from "../api";
  import Button from "../components/Button.svelte";
  import LogEntry from "../components/LogEntry.svelte";
  import Summary from "../components/Summary.svelte";

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

  const logs = subscribeToWeekLogs();
</script>

<Button on:click={start} disabled={updating || $currentLog}>Start Log</Button>
<Button on:click={stop} disabled={updating || !$currentLog}>End Log</Button>

<h2>This Week</h2>
<h3>Summary</h3>
<Summary logs={$logs} />

<h3>Logs</h3>
<ul>
  {#each Object.entries($logs) as [, log]}
    <LogEntry {log} />
  {/each}
</ul>

<style lang="scss">
  ul {
    margin: 20px 0;
    padding: 0;
  }

  h2 {
    margin: 40px 0 20px;
  }
</style>
