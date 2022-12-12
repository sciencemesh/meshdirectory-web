import { useRef, useEffect, useMemo } from 'react'
import land from '#/data/land.geo.min.json'
import ThreeGlobe from 'three-globe'
import { Vector3, MeshPhongMaterial } from 'three'
import { useFrame } from '@react-three/fiber'
import { areEqual } from '@/util'

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

export default function Globe({ fromProvider, withProvider, providers, camTilt = 20, camZoom = 2.3 }) {
  const meshRef = useRef(null)
  const camFov = useRef(50)

  function globeCoords(provider, highlight) {
    return provider?.location ? { lat: provider.location.lat, lng: provider.location.lon, highlight } : null
  }

  const fromCoords = globeCoords(fromProvider, true)
  const toCoords = globeCoords(withProvider, true)
  const otherProviders = providers.filter((p) => !areEqual(p, fromProvider) && !areEqual(p, withProvider))
  const randomConnections = useMemo(
    () =>
      otherProviders
        .sort(() => 0.5 - Math.random())
        .map((p1, i) =>
          Math.random() > 0.5
            ? otherProviders
                .slice(i, Math.floor(Math.random() * 1000) % otherProviders.length)
                .map((p2) => (Math.random() > 0.5 ? [p1, p2] : [p1, p2]))
            : [],
        )
        .flat()
        .filter(([p1, p2]) => !areEqual(p1, p2))
        .map(([p1, p2]) => {
          const { lat: startLat, lng: startLng } = globeCoords(p1)
          const { lat: endLat, lng: endLng } = globeCoords(p2)
          return {
            startLat,
            startLng,
            endLat,
            endLng,
            color: '#c7e8f9',
          }
        }),
    [otherProviders],
  )

  useEffect(() => {
    if (fromCoords) {
      const ringColor = (t) => `rgba(10, 10, 10, ${Math.sqrt(1 - t)})`

      GlobeObj.ringsData([{ ...fromCoords, maxR: 2, propagationSpeed: 0.5, repeatPeriod: 1000 }])
        .ringColor(() => ringColor)
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
        .arcsData(randomConnections)
        .arcColor('color')
        .arcDashLength((d) => (d.highlight ? 0.4 : 0.02))
        .arcStroke((d) => (d.highlight ? 0.5 : 0.2))
        .arcDashGap(0.03)
        .arcAltitudeAutoScale((d) => (d.highlight ? 1 : 0.5))
        .arcDashInitialGap((d) => (d.highlight ? 1 : 0))
        .arcDashAnimateTime((d) => (d.highlight ? 4000 : 6000))
    }
  }, [fromCoords, randomConnections])

  useEffect(() => {
    GlobeObj.hexBinPointsData([
      ...otherProviders.map((p) => globeCoords(p)),
      ...(fromCoords ? [fromCoords] : []),
      ...(toCoords ? [toCoords] : []),
    ])
      .hexBinPointWeight((d) => (!d.highlight ? Math.random() + 0.3 : 5))
      .hexBinResolution(3)
      .hexMargin(0.1)
      .hexTopColor((d) => (!d.points.some((p) => p.highlight) ? '#46576A' : '#243548'))
      .hexSideColor((d) => (!d.points.some((p) => p.highlight) ? '#c3e4f5' : 'rgba(255,100,50,1)'))
      .hexBinMerge(false)

    if (toCoords) {
      GlobeObj.arcsData([
        ...randomConnections,
        {
          startLat: fromCoords.lat,
          startLng: fromCoords.lng,
          endLat: toCoords.lat,
          endLng: toCoords.lng,
          color: '#243548',
          highlight: true,
        },
      ])
    }
  }, [fromCoords, toCoords, randomConnections, otherProviders])

  useEffect(() => {
    const { x: fromX, y: fromY, z: fromZ } = GlobeObj.getCoords(fromCoords.lat, fromCoords.lng, 1.5)

    if (toCoords) {
      const { x: toX, y: toY, z: toZ } = GlobeObj.getCoords(toCoords.lat, toCoords.lng, Math.max(0.2, 1.5 - camZoom))
      siteCamPosition.set((fromX + toX) / 2 - camTilt * 1.2, (fromY + toY) / 2 + camTilt, (fromZ + toZ) / 2)
      camFov.current = 45
    } else {
      siteCamPosition.set(fromX - camTilt * 1.2, fromY + camTilt, fromZ)
      camFov.current = 50
    }
  }, [fromCoords, toCoords, camTilt, camZoom])

  useFrame((state) => {
    // const step = 0.1
    // state.camera.fov = MathUtils.lerp(state.camera.fov, 50, step)
    state.camera.position.lerp(siteCamPosition, 0.1)
    // focusVec.y = focusVec.y + Math.sin(state.clock.getElapsedTime() * 2)
    state.camera.lookAt(meshRef.current.position)
    if (state.camera.fov < camFov.current) {
      state.camera.fov = state.camera.fov + 0.1
    } else if (state.camera.fov > camFov) {
      state.camera.fov = state.camera.fov - 0.1
    }
    state.camera.updateProjectionMatrix()
  })
  return <primitive ref={meshRef} object={GlobeObj} position={[0, 0, 0]} />
}
