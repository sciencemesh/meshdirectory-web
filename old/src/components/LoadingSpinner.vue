<template>
<div class="loading">
  <fa-icon class="loading-spinner" icon="spinner"></fa-icon>
</div>
</template>

<script>
export default {
  name: "LoadingSpinner"
}
</script>

<style lang="scss" scoped>
@import "src/css/animations.scss";

.loading {
  position: relative;
  width: 100%;
  height: 100%;
  .loading-spinner {
    display: block;
    font-size: 5rem;
    position: absolute;
    left: 50%;
    margin: 1rem auto 0 -2.5rem;
    @include animate('spin' 1s ease-in-out infinite);
  }
}
</style>
