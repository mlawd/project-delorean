<script lang="ts">
</script>

<button on:click {...$$props}>
  <slot />
</button>

<style lang="scss">
  button {
    background-color: var(--primary);
    color: white;
    border-radius: 5px;
    padding: 20px 50px;
    border: none;
    text-transform: uppercase;
    font-size: 20px;

    &:not([disabled]) {
      &:hover {
        cursor: pointer;
      }
    }

    &:disabled {
      background-color: lightgrey;
    }
  }
</style>
