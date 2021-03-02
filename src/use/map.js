import {computed, ref, watch} from 'vue'
import useProviders from '@/use/providers'
import mapData from '../assets/data/europe.geo.json'
import * as d3 from 'd3'


const {locations, originator, target, getLocation} = useProviders()

export default function useMap(center, statesRef, mapRef) {
    const scale = ref(850)
    const projection = computed(() => {
        return d3.geoMercator().scale(scale.value).center(center)
    })
    const path = ref(d3.geoPath(projection.value))
    const markers = ref([])
    const connections = ref([])
    const _locations = [...locations.value]
    const currentMarker = ref(null)
    const targetLoc = computed(() => {
        if (target.value) {
            return getLocation(target)
        }
        return null
    })

    function renderStates() {
        d3.select(statesRef.value)
            .selectAll("path")
            .data(mapData.features)
            .enter()
            .append("path")
            .attr("d", path.value)
    }

    function renderProviders() {

        let i = _locations.length, d, proj

        while (i--) {
            d = _locations[i];
            if (!d.longitude && !d.latitude) {
                // Let's consider this a bad location record
                _locations.splice(i, 1);
            }

            proj = projection.value([d.longitude, d.latitude])
            if (proj) {
                d.x = proj[0];
                d.y = proj[1];
            } else {
                _locations.splice(i, 1);
            }
        }
        Array.prototype.pairs = function (func) {
            for (let i = 0; i < this.length - 1; i++) {
                for (let j = i; j < this.length - 1; j++) {
                    func([this[i], this[j + 1]]);
                }
            }
        }
        _locations.pairs((pair) => {
            connections.value.push(pair)
        })
        // Pick 10 random connections proportional to number of locations
        connections.value = connections.value
            .sort(() => 0.5 - Math.random())
            .slice(0, _locations.length % connections.value.length - 1)
    }

    function getProviderPoint(provider) {
        if (provider.value) {
            return _locations.find(l => {
                return l.key === provider.value.key
            })
        }
    }

    function addMarker(provider) {
        const providerPoint = getProviderPoint(provider)

        if (providerPoint) {
            markers.value.push({
                provider: provider.value,
                x: providerPoint.x,
                y: providerPoint.y
            })
        }
    }

    function renderConnection(connection) {

        let m1 = connection[1],
            m2 = connection[0];

        if (!m1 || !m2) {
            return
        }

        if (m1.x < m2.x) {
            m1 = connection[0];
            m2 = connection[1];
        }

        var dx = m2.x - m1.x,
            dy = m2.y - m1.y,
            dr = Math.sqrt(dx * dx + dy * dy);

        return "M" + m2.x + "," + m2.y + "A" + dr + "," + dr + " 0 0,1 " + m1.x + "," + m1.y;
    }

    function renderMarkers() {
        markers.value = []
        addMarker(getLocation(originator))
        if (targetLoc.value) {
            addMarker(targetLoc.value)
        }
    }

    watch([target], () => renderMarkers())

    function markerSet(e, marker, index) {
        if (e) {
            e.preventDefault()
        }
        const m = markers.value[index]
        m.provider = null
        m.current = true
        m.startX = m.x
        m.startY = m.y
        currentMarker.value = m
        document.addEventListener('mousemove', markerDrag)
        document.addEventListener('mouseup', markerStop)
        mapRef.value.addEventListener('mouseleave', markerLeave)
    }

    function markerDrag(e) {
        currentMarker.value.provider = targetLoc.value
        let mouse = d3.pointer(e)
        currentMarker.value.x = mouse[0]
        currentMarker.value.y = mouse[1] - 141
    }

    function markerLeave() {
        currentMarker.value.x = currentMarker.value.startX;
        currentMarker.value.y = currentMarker.value.startY;

        markerStop();
    }

    function markerStop() {
        document.removeEventListener('mousemove', markerDrag);
        document.removeEventListener('mouseup', markerStop);
        mapRef.value.removeEventListener('mouseleave', markerLeave);

        currentMarker.value.current = false;
        currentMarker.value = null;
    }


    function render() {
        renderStates()
        renderProviders()
        renderMarkers()
    }

    function isOrigin(markerProvider) {
        return markerProvider === getLocation(originator).value
    }

    return {
        markers,
        projection: computed(() => projection.value),
        providerConnections: computed(() => connections.value),
        providerPoints: computed(() => _locations),
        render, renderConnection, isOrigin, markerSet
    }
}
