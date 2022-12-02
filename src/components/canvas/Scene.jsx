import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'

export default function Scene({ children, ...props }) {
  // Everything defined in here will persist between route changes, only children are swapped
  return (
    <Canvas camera={{ position: [0, 0, 150], fov: 45 }} {...props}>
      <ambientLight intensity={1} color='#c3ced7' />
      <directionalLight angle={0.15} penumbra={1.2} position={[800, 85, 100]} intensity={2.8} />
      {children}
      <Preload all />
    </Canvas>
  )
}
