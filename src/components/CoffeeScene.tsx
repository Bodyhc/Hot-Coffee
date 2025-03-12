import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export function CoffeeScene() {
  const cup = useRef()
  
  // Load the 3D model (using a simple cylinder as placeholder)
  useFrame((state) => {
    if (cup.current) {
      cup.current.rotation.y += 0.01
      cup.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <group ref={cup} position={[0, 0, 0]}>
      <mesh>
        <cylinderGeometry args={[1, 0.8, 2, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[1.5, 0, 0]}>
        <torusGeometry args={[0.3, 0.1, 16, 32]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  )
}