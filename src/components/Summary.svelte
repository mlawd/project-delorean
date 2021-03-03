<script lang="ts">
  import { calcDiff } from "../utils/date-time";
  import type { Log } from "../api";

  export let logs: Record<string, Log>;

  $: totalTime = Object.entries(logs).reduce((acc, [, cur]) => {
    const diff = calcDiff(cur.start, cur.end);

    if (diff) {
      acc += diff.totalMins;
    }

    return acc;
  }, 0);

  $: hours = Math.floor(totalTime / 60);
  $: mins = totalTime % 60;
</script>

<p>You have logged {hours} hours and {mins} minutes this week</p>
