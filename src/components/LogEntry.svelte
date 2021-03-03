<script lang="ts">
  import { formatDateTime, calcDiff } from "../utils/date-time";
  import type { Log } from "../api";

  export let log: Log;

  $: start = new Date(log.start);
  $: end = log.end ? new Date(log.end) : null;
  $: diff = calcDiff(log.start, log.end);
  $: mins = diff?.mins;
  $: hours = diff?.hours;
</script>

<li>
  <dl>
    <dt>Start</dt>
    <dd>{formatDateTime(start)}</dd>
    <dt>End</dt>
    <dd>{formatDateTime(end) ?? "Log ongoing"}</dd>
  </dl>
  {#if hours !== undefined}
    <span>
      {hours} Hr <br />{mins} Min
    </span>
  {/if}
</li>

<style lang="scss">
  li {
    display: flex;
    min-height: 80px;
    margin: 12px 0;
    padding: 20px;
    background-color: var(--bg);
    border-radius: 5px;
    box-shadow: 5px 5px 10px #b8b8b8;

    dl {
      flex-grow: 1;

      dt {
        font-weight: bold;
      }
    }

    span {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background-color: var(--accent);
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
    }
  }
</style>
