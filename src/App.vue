<template>
  <div :class="[md? 'main__md': '', lg? 'main__lg': '']" class="main">
    <div class="nav-container">
      <navbar></navbar>
      <navbar-links></navbar-links>
    </div>
    <section v-if="validLink" class="hero">
      <keep-alive v-if="md">
        <mesh-map></mesh-map>
      </keep-alive>
      <div class="meshselect content">
        <div class="subtitle text-description">
          <p>Accept an invitation to collaborate from</p>
          <p class="provider-title">{{ originator.full_name }}</p>
          <p>using your account at</p>
        </div>
        <provider-select></provider-select>
      </div>
    </section>
    <section v-else class="full invalid-link">
      <link-invalid></link-invalid>
    </section>
    <section>
      <mesh-footer></mesh-footer>
    </section>
  </div>
</template>

<script>
import useProviders from '@/use/providers.js'
import Navbar from '@/components/Navbar'
import useUrl from '@/use/query'
import LinkInvalid from '@/components/LinkInvalid'
import useBreakpoints from '@/use/breakpoints'
import ProviderSelect from '@/components/ProviderSelect'
import MeshFooter from '@/components/MeshFooter'
import {defineAsyncComponent} from 'vue'
import NavbarLinks from '@/components/NavbarLinks'

const MeshMap = defineAsyncComponent(() =>
    import('./components/MeshMap.vue')
)

export default {
  name: 'App',
  components: {
    NavbarLinks,
    MeshFooter,
    ProviderSelect,
    LinkInvalid,
    Navbar,
    MeshMap
  },
  setup() {
    const {fetchProviders, fetchLocations, providers, originator} = useProviders()
    const {validLink, baseUrl} = useUrl()
    const {md, lg} = useBreakpoints()

    fetchProviders(`${baseUrl.value}providers`)
    // TODO: replace locations asset with Mentix locations provider in IOP
    // fetchLocations('~assets/data/providers.loc.json')
    fetchLocations()

    return {originator, validLink, providers, md, lg}
  },
}
</script>

<style lang="scss">
@import "src/css/_index.scss";
@import "~ress/dist/ress.min.css";

.main {
  background: $primary-grey;
  overflow: hidden;
  transition: background-color 1s;

  .subtitle {
    padding: 3rem 0 1rem 0;
    font-size: 1.1rem;
  }

  .hero {
    padding-bottom: 5rem;
    filter: drop-shadow(0 5px 5px darken($primary-grey, 15%));
  }

  &__md {
    background: darken($primary-grey, 5%);

    .nav-container {
      display: grid;
      grid-template-columns: 66% auto;
      filter: drop-shadow(0 0 5px darken($primary-grey, 25%));
    }

    .hero {
      display: grid;
      grid-template-columns: 66% auto;
      background: darken($primary-blue, 5%);
      padding: 0;

      .meshselect {
        background: darken($primary-blue, 15%);
        padding: 0 2em 0 2em;
      }
    }
  }
}

.hero {
  color: white;
  display: grid;
  text-align: center;
  height: 100%;
}

.full {
  color: white;
  text-align: center;
  height: 100%;
}
</style>
