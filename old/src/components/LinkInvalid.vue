<template>
  <div class="not-found">
    <div class="wrapper">
      <h1>404</h1>
      <h3>Page Not Found</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "LinkInvalid"
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 8rem;
}

h3 {
  font-size: 2rem;
}

.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;

  .wrapper {
    letter-spacing: .3rem;
    padding-top: 10rem;
    padding-bottom: 10rem;
  }
}
</style>
