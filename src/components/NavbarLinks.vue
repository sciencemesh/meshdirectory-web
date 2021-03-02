<template>
  <div :class="[md? 'links-header__md': '', lg? 'links-header__lg': '']" class="links-header">
    <ul class="row">
      <li v-for="link in navLinks" :key="link.name" :class="link.class">
        <a :href="link.target" target="_new">
          <div class="row">
            <fa-icon :icon="link.icon"></fa-icon>
            <span class="link-label">{{ link.name }}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import useBreakpoints from '@/use/breakpoints'
import {ref} from 'vue'

export default {
  name: "NavbarLinks",
  setup() {
    const {md, lg} = useBreakpoints()
    const navLinks = ref([
      {
        icon: 'sign-in-alt',
        name: 'JOIN',
        target: 'https://developer.sciencemesh.io/docs/how-to-join-sciencemesh/',
        class: ''
      },
      {
        icon: 'book',
        name: 'DOCS',
        target: 'https://developer.sciencemesh.io/docs/',
        class: 'outlined'
      }
    ])
    return {md, lg, navLinks}
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/_variables.scss";

.links-header {
  display: none;

  &__md {
    background: lighten($secondary-grey, 60%);
    padding: 2em 4em 2em 2em;
    display: flex;
    flex-direction: row;
    align-items: center;

    .row {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }

    ul {
      display: flex;
      justify-content: space-between;
      width: 7em;
      float: right;

      li {
        cursor: pointer;
        color: white;
        background: darken($secondary-orange, 5%);
        margin: 0 .3em 0 1em;
        padding: .5em .2em .5em .2em;
        border-radius: 25px;
        display: inline-block;
        opacity: .7;
        height: 100%;

        &:hover {
          background: darken($secondary-grey, 15%);
        }
      }

      li.outlined {
        background: $secondary-grey;

        &:hover {
          background: darken($secondary-orange, 40%);
        }
      }

      a {
        color: white;
        line-height: 1;
        height: 100%;
        padding: .6rem 1.2rem .4rem .9rem;
        display: block;
      }

      .link-label {
        display: inline-block;
        align-self: center;
        font-weight: 700;
        font-size: .8rem;
        padding-left: .8rem;
        vertical-align: super;
        letter-spacing: .11rem;
      }
    }
  }
}
</style>
