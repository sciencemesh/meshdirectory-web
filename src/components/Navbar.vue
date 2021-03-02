<template>
  <header :class="[md? 'nav__md': '', lg? 'nav__lg': '']" class="nav">
    <div class="row">
      <a class="brand-link" href="/">
        <div class="logo"></div>
      </a>
      <span class="app-title">DIRECTORY</span>
    </div>
  </header>
</template>
<script>
import useBreakpoints from "@/use/breakpoints";

export default {
  name: "Navbar",
  setup() {
    const {md, lg} = useBreakpoints()
    return {md, lg}
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/_variables.scss";

.nav {
  background-color: rgba(255, 255, 255, 0.9);

  &__md {
    .row {
      flex-direction: row;
      background: rgba(255, 255, 255, 0.9);
      justify-content: start;
      padding: 2em 2em 2em 4em;
    }
  }

  &__lg {
    .wrapper {
      padding: 2em 2em 2em 10em;
    }
  }
}

.wrapper {
  a {
    display: block;
    padding: 0 1em;
    color: white;
  }
}

.row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2em;

  .app-title {
    margin: 1rem 0 1rem 0;
    font-size: 2rem;
    letter-spacing: .13rem;
    font-weight: 700;
    color: $primary-grey;
  }

  .logo {
    background: url('../assets/images/logo-sciencemesh.svg') no-repeat;
    width: 190px;
    height: 70px;
  }
}
</style>
