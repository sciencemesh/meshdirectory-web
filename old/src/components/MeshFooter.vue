<template>
  <footer>
    <div :class="[md? 'container__md': '']" class="container">
      <div class="row">
        <div class="col">
          <div class="footer-logo center-align"></div>
        </div>
        <div class="footer-resource-links col-md-3 col-xs-12">
          <h4>Resources</h4>
          <ul>
            <li v-for="link in resourcesLinks" :key="link.name">
              <fa-icon class="link-icon" :icon="link.icon"></fa-icon>
              <a :href="link.target" target="_new">{{ link.name }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col center-align funding">
          <p><a href="https://cs3mesh4eosc.eu/" target="_new">CS3MESH4EOSC</a> has received funding from the
            European Union's Horizon 2020 research and innovation programme under the Grant Agreement no 863353
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import useBreakpoints from '@/use/breakpoints'
import {ref} from 'vue'

export default {
  name: "MeshFooter",
  setup() {
    const {md} = useBreakpoints()
    const resourcesLinks = ref([
      {
        name: 'GitHub',
        target: 'https://github.com/sciencemesh/sciencemesh',
        icon: ['fab', 'github']
      },
      {
        name: 'Gitter',
        target: 'https://gitter.im/sciencemesh/community',
        icon: ['fab', 'gitter']
      },
      {
        name: 'Documentation',
        target: 'https://developer.sciencemesh.io/docs/',
        icon: 'book'
      },
      {
        name: 'Deploy',
        target: 'https://developer.sciencemesh.io/docs/iop/deployment/',
        icon: 'rocket'
      }
    ])
    return {md, resourcesLinks}
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/_index.scss";

.center-align {
  margin: auto;
}

.container {
  background: darken($primary-grey, 10%);
  color: lighten($primary-grey, 40%);
  text-align: center;
  padding: 2.5em;
  opacity: .6;

  .footer-logo {
    filter: drop-shadow(2px 2px 6px black);
    background: url('../assets/images/project-logo.svg') no-repeat;
    width: 300px;
    height: 160px;
  }

  .footer-resource-links {
    color: white;

    padding-bottom: 1.2em;

    h4 {
      font-weight: 700;
      letter-spacing: .1em;
      padding: .3em 0 .7em 0;
      font-size: 1.1em;
    }

    a {
      color: unset;
      text-decoration: underline;
    }

    ul {
      li {
        justify-content: flex-start;
        padding: .4em 0 .4em 0;

        .link-icon {
          margin-right: .7em;
        }
      }
    }
  }

  .funding {
    a {
      color: white;
      text-decoration: underline;
    }
  }

  &__md {
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }

    .footer-resource-links {
      text-align: left;

      ul {
        li {
          display: grid;
          grid-template-columns: 25% auto;
        }
      }
    }

    .col {
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
