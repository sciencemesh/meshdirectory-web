import { useRef, useEffect, useMemo } from 'react'
import countries from '#/data/countries.geo.json'
import ThreeGlobe from 'three-globe'
import { Vector3, MeshPhongMaterial } from 'three'
import { useFrame, invalidate } from '@react-three/fiber'

const siteCamPosition = new Vector3()
const whitePhongMaterial = new MeshPhongMaterial({ color: 0xffffff, transparent: false })

export default function Globe({ fromProvider, withProvider, camTilt = 30, camZoom = 2 }) {
  const meshRef = useRef(null)

  const Globe = useMemo(
    () =>
      new ThreeGlobe({ waitForGlobeReady: true, animateIn: false })
        .showGlobe(true)
        .hexPolygonsData(countries.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.1)
        .hexPolygonsTransitionDuration(500)
        .hexPolygonColor(() => '#0C80AA') // primary-dark
        .atmosphereColor('#1F91CC') // primary
        .atmosphereAltitude(0.15)
        .globeMaterial(whitePhongMaterial),
    [],
  )

  const fromCoords = useMemo(
    () => (fromProvider ? { lat: fromProvider.location.lat, lng: fromProvider.location.lon } : null),
    [fromProvider],
  )
  const toCoords = useMemo(
    () => (withProvider ? { lat: withProvider.location.lat, lng: withProvider.location.lon } : null),
    [withProvider],
  )

  useEffect(() => {
    if (fromCoords) {
      const ringColor = (t) => `rgba(10, 10, 10, ${Math.sqrt(1 - t)})`

      Globe.ringsData([{ ...fromCoords, maxR: 4, propagationSpeed: 1.2, repeatPeriod: 1000 }])
        .ringColor(() => ringColor)
        .ringMaxRadius('maxR')
        .ringPropagationSpeed('propagationSpeed')
        .ringRepeatPeriod('repeatPeriod')
    }
  }, [fromCoords, Globe])

  useEffect(() => {
    Globe.hexBinPointsData([...(fromCoords ? [fromCoords] : []), ...(toCoords ? [toCoords] : [])])
      .hexBinPointWeight(3)
      .hexBinResolution(3)
      .hexMargin(0.1)
      .hexTopColor((d) => (d.isTarget ? 'green' : '#243548'))
      .hexSideColor((d) => (d.isTarget ? 'green' : 'rgba(255,100,50,1)'))
      .hexBinMerge(false)

    if (toCoords) {
      Globe.arcsData([
        {
          startLat: fromCoords.lat,
          startLng: fromCoords.lng,
          endLat: toCoords.lat,
          endLng: toCoords.lng,
          color: '#243548',
        },
      ])
        .arcColor('color')
        .arcDashLength(0.78)
        .arcStroke(0.5)
        .arcDashGap(() => 0.3)
        .arcAltitudeAutoScale(2.5)
        .arcDashInitialGap(() => 2)
        .arcDashAnimateTime(1500)
    }
  }, [fromCoords, toCoords, Globe])

  useEffect(() => {
    const { x: fromX, y: fromY, z: fromZ } = Globe.getCoords(fromCoords.lat, fromCoords.lng, 1.5)

    if (toCoords) {
      const { x: toX, y: toY, z: toZ } = Globe.getCoords(toCoords.lat, toCoords.lng, Math.max(0.2, 1.5 - camZoom))
      siteCamPosition.set((fromX + toX) / 2 - camTilt, (fromY + toY) / 2 - camTilt, (fromZ + toZ) / 2)
    } else {
      siteCamPosition.set(fromX - camTilt, fromY - camTilt, fromZ)
    }
    invalidate()
  }, [fromCoords, toCoords, Globe, camTilt, camZoom])

  useFrame((state) => {
    // const step = 0.1
    // state.camera.fov = MathUtils.lerp(state.camera.fov, 50, step)
    state.camera.position.lerp(siteCamPosition, 0.1)
    // focusVec.y = focusVec.y + Math.sin(state.clock.getElapsedTime() * 2)
    state.camera.lookAt(meshRef.current.position)
    state.camera.updateProjectionMatrix()
    invalidate()
  })
  return <primitive ref={meshRef} object={Globe} position={[0, 0, 0]}></primitive>
}
