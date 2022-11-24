import countries from '#/data/countries.geo.json'
import ThreeGlobe from 'three-globe'

export default function Globe({ ...props }) {
  const GlobeObj = new ThreeGlobe()
    // .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
    .hexPolygonsData(countries.features)
    .hexPolygonResolution(3)
    .hexPolygonMargin(0.3)
    .hexPolygonColor(
      () =>
        `#${Math.round(Math.random() * Math.pow(2, 24))
          .toString(16)
          .padStart(6, '0')}`,
    )

  return <primitive object={GlobeObj} position={[10, 0, 0]} />
}
