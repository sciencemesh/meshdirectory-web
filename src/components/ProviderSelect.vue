<template>
  <div class="container">
    <div id="scroll-container">
      <div ref="wrapScroll" :class="[detailsExpanded? 'provider-details__open': '']"
           :style="{maxHeight: `${wrapHeight}px`, minHeight: `${wrapHeight}px`}"
           class="wrap-container">
        <ul ref="ulScroll" class="ul-scroll">
          <li v-for="(provider, i) in internalProviders"
              v-show="!detailsExpanded"
              :key="provider.name"
              :ref="el => { if (el) providerOptions[i] = el }" :class="[provider.name === target?.name ? 'active': '']"
              @click="provider.name === target?.name? detailsExpanded = true: null">
            <span class="item">{{ provider.full_name }}</span>
          </li>
        </ul>
        <div :class="[detailsExpanded? 'provider-details__open': '', md? 'provider-details__md': '']"
             class="provider-details">
          <div class="close-btn">
            <button @click="closeDetails">
              <pre>x</pre>
            </button>
          </div>
          <div class="subtitle text-description">
            <p class="provider-title">{{ target?.full_name }}</p>
            <p>{{ target?.description }}</p>
            <p class="provider-detail-label">Operated By</p>
            <p>{{ target?.organization }}</p>
            <a v-if="target?.homepage"
               :href="target?.homepage"
               class="provider-detail-home"
               target="_new">{{ target.homepage }}</a>
          </div>
          <a :href="targetLink" class="accept-btn">Accept</a>
        </div>
      </div>
    </div>
    <svg>
      <defs>
        <linearGradient id="gradient" x1="0" x2="0" y1="0%" y2="50%">
          <stop offset="0" stop-color="black"/>
          <stop offset="0.5" stop-color="white"/>
          <stop offset="1" stop-color="black"/>
        </linearGradient>
        <mask id="masking" maskContentUnits="objectBoundingBox" maskUnits="objectBoundingBox">
          <rect fill="url(#gradient)" height="1" width="1" y="0"/>
        </mask>
      </defs>
    </svg>
  </div>
</template>
<script>
import {computed, onBeforeUpdate, ref, watch} from 'vue'
import useProviders from '@/use/providers'
import {useOnScroll} from 'vue-composable'
import useBreakpoints from "@/use/breakpoints";

export default {
  name: "ProviderSelect",
  props: {
    wrapHeight: {
      type: Number,
      default: 350
    },
  },
  setup() {
    const {
      providers,
      target,
      setTarget,
      targetLink,
      originator,
      detailsExpanded,
      expandDetails,
      hideDetails
    } = useProviders()
    const {md} = useBreakpoints()
    const wrapScroll = ref(null)
    const {scrollTop, scrollTopTo} = useOnScroll(wrapScroll)
    const providerOptions = ref([])

    const internalProviders = computed(() => {
      return providers.value.filter(p => {
        return p.name !== originator.value.name
      })
    })

    const scrollIndex = computed(() => {
      if (scrollTop.value > 0) {
        const scrollPercentage = (scrollTop.value / wrapScroll.value.clientHeight)
        return Math.round(scrollPercentage * Math.abs(internalProviders.value.length))
      }
      return 0
    })

    const targetIndex = computed(() => {
      if (target.value) {
        return internalProviders.value.findIndex(p => p.name === target.value.name)
      }
      return -1
    })

    onBeforeUpdate(() => {
      providerOptions.value = []
    })

    function onTargetChanged() {
      const targetEl = providerOptions.value[targetIndex.value]
      if (targetEl) {
        scrollTopTo(targetEl.clientTop + targetEl.offsetTop)
      }
    }

    watch([target], () => {
      onTargetChanged()
    })

    watch([scrollTop], () => {
      if (detailsExpanded.value) {
        return
      }
      const provider = internalProviders.value[scrollIndex.value]
      if (provider.name !== target.value?.name) {
        setTarget(provider)
      }
    })

    function closeDetails() {
      hideDetails()
      onTargetChanged()
    }

    return {
      internalProviders,
      target,
      scrollTop,
      wrapScroll,
      providerOptions,
      detailsExpanded,
      expandDetails,
      hideDetails,
      closeDetails,
      targetLink,
      md
    }
  }
}
</script>
<style lang="scss" scoped>
@import "src/css/_variables.scss";

svg {
  display: none;
}

.provider-details {
  background: darken($primary-grey, 15%);
  width: 100%;
  height: 100%;
  max-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
  transition: max-height 0.3s ease-out;
  border-radius: 3px;

  .provider-title {
    padding-top: 0;
  }

  .provider-detail-label {
    padding: 1rem 0 0 0;
    font-size: .7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05rem;
    opacity: .6;
  }

  .provider-detail-home {
    color: $primary-blue;
  }

  .close-btn {
    padding: 0 .5rem .2rem .5rem;
    position: absolute;
    top: 10px;
    right: 20px;
    font-weight: 700;
    font-size: 2rem;
    color: lighten($primary-grey, 15%);

    &:hover {
      background: white;
      border-radius: 150px;
      transition: all .4s ease-in-out;
    }
  }

  .text-description {
    padding: 1em 1em 1em 1em;
  }

  .accept-btn {
    font-size: 1.2em;
    font-weight: 700;
    letter-spacing: .2em;
    padding: 2rem 0 2rem 0;
    background: $secondary-orange;
    color: whitesmoke;

    &:hover {
      background: darken($secondary-orange, 15%);
    }
  }

  &__open {
    padding: 2rem 0 0 0;
    max-height: 100%;
  }

  &__md {
    background: darken($primary-blue, 30%);

    .close-btn {
      color: lighten($primary-grey, 15%);
    }
  }
}

#scroll-container {
  overflow: hidden;
  max-width: 100%;
  margin: auto;
  position: relative;
  min-height: 200px;
  z-index: 0;
}

.wrap-container {
  width: 100%;
  height: 100%;
  //position: absolute;
  top: 0;
  left: 0;
  position: relative;
  max-height: 300px;
  max-width: 100%;
  margin: auto;
  overflow: auto;
  mask: url(#masking);
  -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(.1, transparent), color-stop(0.5, black), color-stop(.9, transparent));

  &.provider-details__open {
    mask: unset;
    -webkit-mask-image: unset;
  }
}

.ul-scroll::-webkit-scrollbar,
.wrap-container::-webkit-scrollbar,
#scroll-container::-webkit-scrollbar {
  display: none;
}

.ul-scroll, .wrap-container, #scroll-container {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  height: 100%;
}

.wrap-container ul {
  list-style: none;
  position: relative;
  transition: transform .3s;
  top: 50px;
}

.wrap-container ul, .wrap-container ul li {
  margin: 0;
  padding: 0;
  text-align: center;
}

.wrap-container ul li {
  height: 50px;
  line-height: 50px;
  transition: transform .3s;
  overflow: hidden;
  font-size: .9em;

  &.provider-details__open {
    cursor: none;
    height: 100%;
  }
}

.wrap-container ul li:first-of-type {
  margin-top: 150px;

  &.provider-details__open {
    margin-top: 0;
  }
}

.wrap-container ul li:last-of-type {
  padding-bottom: 150px;

  &.provider-details__open {
    padding-bottom: 0;
  }
}

.wrap-container ul li.active .item {
  transform: scale(1.9);
  cursor: pointer;
}

.active {
  opacity: 1;
  color: white;
  border-bottom: 1px solid darken($primary-blue, 35%);
  border-radius: 10px;
  font-weight: 700;
}

.wrap-container ul li .item {
  position: relative;
  text-wrap: normal;
  transition: transform 200ms;
  display: inline-block;
}
</style>
