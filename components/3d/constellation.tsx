'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const SIGNAL = new THREE.Color('#5ad4e6')
const DIM = new THREE.Color('#6b7785')

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)

  const COUNT = 90

  const { positions, linePositions } = useMemo(() => {
    const rand = seededRandom(42)
    const pts: THREE.Vector3[] = []
    for (let i = 0; i < COUNT; i++) {
      pts.push(
        new THREE.Vector3(
          (rand() - 0.5) * 14,
          (rand() - 0.5) * 8,
          (rand() - 0.5) * 6,
        ),
      )
    }
    const positions = new Float32Array(COUNT * 3)
    pts.forEach((p, i) => {
      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y
      positions[i * 3 + 2] = p.z
    })

    // connect near neighbours
    const segs: number[] = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        if (pts[i].distanceTo(pts[j]) < 2.2) {
          segs.push(pts[i].x, pts[i].y, pts[i].z, pts[j].x, pts[j].y, pts[j].z)
        }
      }
    }
    return { positions, linePositions: new Float32Array(segs) }
  }, [])

  const { pointer } = useThree()

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // camera tilt toward pointer
    const targetX = pointer.y * 0.12
    const targetY = pointer.x * 0.2
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04
    groupRef.current.rotation.z += delta * 0.01
  })

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.09}
          color={SIGNAL}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={DIM} transparent opacity={0.22} />
      </lineSegments>
    </group>
  )
}

export function Constellation() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
    >
      <ParticleField />
    </Canvas>
  )
}

export default Constellation
