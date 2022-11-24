import { useState, useEffect, createRef } from 'react'
import meshGlobeCountries from '../public/mesh-globe-countries'
import { getLocation } from '../src/util';
import ThreeGlobe from './ThreeGlobe';

export default function MeshGlobe ({ providers, originator, providerLocations, selected }) {
    const [[width, height], setSize] = useState([500, 500])
    const [ssrDone, setSsrDone] = useState(false)
    const globeEl = createRef()

    useEffect(() => {
        setSsrDone(true)
    }, [])

    return <>
        {ssrDone &&
            <ThreeGlobe
                ref={globeEl}
                // globeImageUrl="//unpkg.com/three-globe/example/img/earth-dark.jpg"
                height={height}
                width={width}
                rendererConfig={{ antialias: false, alpha: true }}
                waitForGlobeReady
                showGlobe={false}
                animateIn
                atmosphereColor="#c5cAd4"
                backgroundColor="#ffffff"
                hexPolygonsData={meshGlobeCountries.features}
                hexPolygonResolution={3}
                hexPolygonCurvatureResolution={1}
                hexPolygonMargin={0.1}
                // hexPolygonColor={() => `#${Math.round(Math.random() * Math.pow(2, 24)).toString(16).padStart(6, '0')}`}
                hexPolygonColor={() => '#454A54'}
            />
        }
    </>
}