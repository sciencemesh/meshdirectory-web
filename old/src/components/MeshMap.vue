<template>
  <div class="map-container">
    <svg ref="map" v-if="loaded" :viewBox="viewBox"
         class="mesh-map" height="100%"
         width="100%">
      <g ref="states" class="mesh-states"></g>
      <g v-for="(connection, i) in providerConnections" :key="i" class="provider-connector">
        <path :d="renderConnection(connection)" :style="`--animation-order: ${i};`"
              class="provider-connector"></path>
      </g>
      <path :d="renderConnection([markers[0], markers[1]])"
            class="provider-connector provider-connector__active"></path>
      <g ref="mesh-providers">
        <g v-for="provider in providerPoints" :key="provider.name"
           :class="{ 'provider__originator' : provider.key === originator.name }"
           class="provider">
          <circle :cx="provider.x" :cy="provider.y" class="provider__marker" r="4"/>
          <circle v-if="provider.key !== originator.name"
                  :cx="provider.x" :cy="provider.y" class="provider__button" r="16"
                  @mouseup="setTargetProvider(provider)"/>
          <transition v-if="provider.key !== originator.name && provider.key !== target?.name" name="marker-fade">
            <text class="provider__tooltip"
                  :x="provider.x? provider.x : 0" :y="provider.y? provider.y + 32: 0"
                  text-anchor="middle">{{ provider.key }}
            </text>
          </transition>
        </g>
      </g>
      <g v-for="(marker, index) in markers"
         :key="index"
         :class="{ 'marker__origin' : isOrigin(marker.provider), 'marker__current':  marker.current }"
         :transform="`translate(${marker.x}, ${marker.y})`"
         class="marker"
         @mousedown.prevent="markerSet($event, marker, index)">
        <path :fill="marker.fill"
              d="M0 0l28.592-28.592c15.78-15.78 15.908-41.24.128-57.02a40.424 40.424 0 0 0-57.124 57.2z"></path>
        <transition name="marker-fade">
          <text v-if="marker.provider" text-anchor="middle" x="0" y="-50">{{ marker.provider.key }}</text>
        </transition>
      </g>
    </svg>
    <loading-spinner v-else></loading-spinner>
    <div class="map-help">
      <fa-icon icon="info-circle"></fa-icon>
      <span>Pick your CS3MESH provider from the map</span>
    </div>
  </div>
</template>

<script>
import useProviders from '@/use/providers'
import useMap from '@/use/map'
import {computed, onMounted, ref} from 'vue'
import LoadingSpinner from './LoadingSpinner'

export default {
  name: "MeshMap",
  components: {LoadingSpinner},
  setup() {
    const states = ref(null)
    const map = ref(null)

    const {providers, expandDetails, loaded, getProvider, setTarget, originator, target} = useProviders()
    const {render, renderConnection, providerPoints, providerConnections, markers, markerSet, isOrigin} =
        useMap([14, 54], states, map)

    const viewBox = computed(() => {
      if (map.value) {
        return `0 0 ${map.value.clientWidth} ${map.value.clientHeight}`
      }
      return `0 0 1000 800`
    })

    onMounted(() => {
      render()
    })

    function setTargetProvider(location) {
      setTarget(getProvider(location).value)
      expandDetails()
    }

    return {
      providers, loaded, markers, states, map, renderConnection, originator,
      providerPoints, providerConnections, isOrigin, setTargetProvider,
      markerSet, viewBox, target
    }
  }
}
</script>

<style lang="scss">
@import 'src/css/_variables.scss';
@import 'src/css/animations';

.map-container {
  position: relative;
  min-height: 350px;
}

.mesh-map {
  display: block;
  max-width: 100%;
  overflow: hidden;
  background-color: #1F91CC;
  opacity: 1;
  // Pattern courtesy https://www.magicpattern.design/tools/css-backgrounds
  background: radial-gradient(circle, transparent 20%, #1F91CC 20%, #1F91CC 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, #1F91CC 20%, #1F91CC 80%, transparent 80%, transparent) 30px 30px, linear-gradient(#15628a 2.4000000000000004px, transparent 2.4000000000000004px) 0 -1.2000000000000002px, linear-gradient(90deg, #15628a 2.4000000000000004px, #1F91CC 2.4000000000000004px) -1.2000000000000002px 0;
  background-size: 23px 33px, 33px 23px;

  .mesh-states {
    stroke: darken($primary-blue, 10%);
    stroke-width: 2;
    stroke-dasharray: .5em;
    fill: darken($primary-blue, 30%);
    filter: drop-shadow(12px 12px 13px darken($primary-blue, 20%));
  }

  .provider {
    fill: #FFF;
    stroke-width: 2;
    stroke: transparent;
    transition: stroke 0.3s linear;
  }

  .provider:hover {
    stroke: rgba(255, 255, 255, 0.3);
  }

  .provider__button {
    fill: transparent;
    cursor: pointer;
  }

  .provider__tooltip {
    fill: transparent;
  }

  .provider__originator {
    fill: $secondary-orange;
    transform: scaleZ(2);
    stroke: rgba(255, 255, 255, 0.3);
  }

  .provider-connector {
    fill: none;
    opacity: .8;
    stroke: lighten($primary-blue, 35%);
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-dasharray: 2 8;
    pointer-events: none;
    z-index: -1;
    path {
      opacity: 0;
      animation-name: staggered-opacity;
      animation-duration: 1.5s;
      animation-delay: calc(var(--animation-order) * 2200ms);
      animation-timing-function: ease-in-out;
      animation-iteration-count: 10 + random(50);
      animation-direction: alternate;
      animation-fill-mode: both;
    }

    &__active {
      stroke-width: 8px;
      opacity: 1;
      stroke: white;
      stroke-dasharray: 10 4;
      stroke-linecap: butt;
      animation-delay: 0s;
      @include animate(marching-ants 50s linear 1s infinite)
    }
  }

  .marker-fade {
    &-leave-active,
    &-enter-active {
      transition: opacity .3s linear;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  .marker {
    fill: $secondary-orange;
    stroke: darken($secondary-orange, 35%);
    stroke-width: 3;
    cursor: pointer;
    transition: opacity 0.3s linear;
    user-select: none;
    -moz-box-shadow: inset 0 0 10px #000000;
    -webkit-box-shadow: inset 0 0 10px #000000;
    box-shadow: inset 0 0 10px #000000;

    > * {
      transition: transform 0.3s cubic-bezier(.6, .0, .5, 1);
    }

    path {
      filter: drop-shadow(1px 5px 3px darken($primary-grey, 20%));
    }

    text {
      stroke: none;
      fill: white;
      font-family: inherit;
      font-weight: bold;
      font-size: .8rem;
    }

    &__origin {
      fill: $primary-blue;
      stroke: darken($primary-blue, 35%);
      pointer-events: none;
      cursor: pointer;

      path, text {
        transform: scale(.7);
      }
    }

    &__current {
      opacity: 0.6;

      > * {
        transform: scale(0.8);
      }
    }
  }
}
.map-help {
  padding: 15px;
  background-color: $primary-grey;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: smaller;
  display: block;
  border-top-right-radius: 5px;
  opacity: .8;

  .fa-info-circle {
    margin-right: 1em;
  }
}
</style>
