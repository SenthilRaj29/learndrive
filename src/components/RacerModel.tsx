import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  helmet: string;
  jacket: string;
  gloves: string;
}

const RacerModel = ({ helmet, jacket, gloves }: Props) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body / Jacket */}
      <mesh position={[0, 0.6, 0]}>
        <capsuleGeometry args={[0.3, 0.6, 8, 16]} />
        <meshStandardMaterial color={jacket} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Helmet */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={helmet} roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Visor */}
      <mesh position={[0, 1.35, 0.22]}>
        <boxGeometry args={[0.35, 0.12, 0.05]} />
        <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
      </mesh>

      {/* Left arm / glove */}
      <mesh position={[-0.45, 0.6, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 8]} />
        <meshStandardMaterial color={jacket} roughness={0.4} />
      </mesh>
      <mesh position={[-0.45, 0.2, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={gloves} roughness={0.3} />
      </mesh>

      {/* Right arm / glove */}
      <mesh position={[0.45, 0.6, 0]}>
        <capsuleGeometry args={[0.1, 0.5, 8, 8]} />
        <meshStandardMaterial color={jacket} roughness={0.4} />
      </mesh>
      <mesh position={[0.45, 0.2, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={gloves} roughness={0.3} />
      </mesh>

      {/* Legs */}
      <mesh position={[-0.15, -0.2, 0]}>
        <capsuleGeometry args={[0.12, 0.5, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>
      <mesh position={[0.15, -0.2, 0]}>
        <capsuleGeometry args={[0.12, 0.5, 8, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.5} />
      </mesh>

      {/* Floor shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial color="#000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export default RacerModel;
