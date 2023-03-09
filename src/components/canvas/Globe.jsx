import { useRef, useEffect, useMemo } from 'react'
import land from '#/data/land.geo.min.json'
import ThreeGlobe from 'three-globe'
import { Vector3, MeshPhongMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { areEqual } from '@/util'
import { ErrorBoundary } from 'react-error-boundary'
import GlobeError from '@/components/dom/GlobeError'

const siteCamPosition = new Vector3()
const whitePhongMaterial = new MeshPhongMaterial({ color: 0xffffff, transparent: false })

const GlobeObj = new ThreeGlobe({ waitForGlobeReady: true, animateIn: false })
  .showGlobe(true)
  .hexPolygonsData([land])
  .hexPolygonResolution(3)
  .hexPolygonMargin(0.1)
  .hexPolygonCurvatureResolution(1)
  .hexPolygonsTransitionDuration(500)
  .hexPolygonColor(() => '#0C80AA') // primary-dark
  .atmosphereColor('#0C80AA') // primary
  .atmosphereAltitude(0.14)
  .globeMaterial(whitePhongMaterial)

export default function Globe({
  fromProvider,
  withProvider,
  providers,
  camTilt = 20,
  camZoom = 2.3,
  randomProviderConnections,
}) {
  const meshRef = useRef(null)
  const camFov = useRef(50)

  const fromLoc = fromProvider?.location
  const toLoc = withProvider?.location

  const otherProviders = providers.filter((p) => !areEqual(p, fromProvider) && !areEqual(p, withProvider))

  useEffect(() => {
    GlobeObj.arcsData(randomProviderConnections)
      .arcColor('color')
      .arcDashLength((d) => (d.highlight ? 0.4 : 0.02))
      .arcStroke((d) => (d.highlight ? 0.5 : 0.2))
      .arcDashGap(0.03)
      .arcAltitudeAutoScale((d) => (d.highlight ? 1 : 0.5))
      .arcDashInitialGap((d) => (d.highlight ? 1 : 0))
      .arcDashAnimateTime((d) => (d.highlight ? 4000 : 6000))
  }, [randomProviderConnections])

  useEffect(() => {
    if (fromLoc) {
      const ringColor = (t) => `rgba(10, 10, 10, ${Math.sqrt(1 - t)})`

      GlobeObj.ringsData([
        {
          ...fromLoc,
          highlight: true,
          maxR: 2,
          propagationSpeed: 0.5,
          repeatPeriod: 1000,
        },
      ])
        .ringColor(() => ringColor)
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
    }
  }, [fromLoc])

  useEffect(() => {
    GlobeObj.hexBinPointsData([
      ...otherProviders.map((p) => (p.location ? p.location : [])),
      ...(fromLoc ? [{ ...fromLoc, highlight: true }] : []),
      ...(toLoc ? [{ ...toLoc, highlight: true }] : []),
    ])
      .hexBinPointWeight((d) => (!d.highlight ? Math.random() + 0.3 : 5))
      .hexBinResolution(3)
      .hexMargin(0.1)
      .hexTopColor((d) => (!d.points.some((p) => p.highlight) ? '#46576A' : '#243548'))
      .hexSideColor((d) => (!d.points.some((p) => p.highlight) ? '#c3e4f5' : 'rgba(255,100,50,1)'))
      .hexBinMerge(false)

    if (fromLoc && toLoc) {
      GlobeObj.arcsData([
        ...randomProviderConnections,
        {
          startLat: fromLoc.lat,
          startLng: fromLoc.lng,
          endLat: toLoc.lat,
          endLng: toLoc.lng,
          color: '#243548',
          highlight: true,
        },
      ])
    }
  }, [fromLoc, toLoc, randomProviderConnections, otherProviders])

  useEffect(() => {
    const { x: fromX, y: fromY, z: fromZ } = GlobeObj.getCoords(fromLoc.lat, fromLoc.lng, 1.5)

    if (toLoc) {
      const { x: toX, y: toY, z: toZ } = GlobeObj.getCoords(toLoc.lat, toLoc.lng, Math.max(0.2, 1.5 - camZoom))
      siteCamPosition.set((fromX + toX) / 2 - camTilt * 1.2, (fromY + toY) / 2 + camTilt, (fromZ + toZ) / 2)
      camFov.current = 45
    } else {
      siteCamPosition.set(fromX - camTilt * 1.2, fromY + camTilt, fromZ)
      camFov.current = 50
    }
  }, [fromLoc, toLoc, camTilt, camZoom])

  useFrame((state) => {
    state.camera.position.lerp(siteCamPosition, 0.1)
    state.camera.lookAt(meshRef.current.position)
    if (state.camera.fov < camFov.current) {
      state.camera.fov = state.camera.fov + 0.1
    } else if (state.camera.fov > camFov) {
      state.camera.fov = state.camera.fov - 0.1
    }
    state.camera.updateProjectionMatrix()
  })
  return (
    <ErrorBoundary FallbackComponent={GlobeError} onReset={() => {}}>
      <primitive ref={meshRef} object={GlobeObj} position={[0, 0, 0]} />
    </ErrorBoundary>
  )
}
