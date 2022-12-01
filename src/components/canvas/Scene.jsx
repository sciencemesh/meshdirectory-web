import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas camera={{ position: [0, 0, 300], fov: 60 }} {...props}>
      {/* <Stars radius={50} depth={0} count={4000} factor={10} saturation={0.8} fade speed={2} /> */}
      <ambientLight intensity={1} color='#c3e4f5' />
      <directionalLight angle={0.2} penumbra={1} position={[800, 85, 100]} intensity={2.6} />
      {children}
      <Preload all />
      {/* <OrbitControls /> */}
      {/* <Stats /> */}
    </Canvas>
  )
}
