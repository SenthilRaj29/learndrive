import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Props {
  type: string;
}

const VehicleModel = ({ type }: Props) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });

  if (type === "car") {
    return (
      <group ref={ref}>
        {/* Car body */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[2, 0.5, 1]} />
          <meshStandardMaterial color="#00e676" roughness={0.2} metalness={0.7} />
        </mesh>
        {/* Cabin */}
        <mesh position={[0, 0.8, 0]}>
          <boxGeometry args={[1, 0.4, 0.9]} />
          <meshStandardMaterial color="#111" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Wheels */}
        {[[-0.7, 0.15, 0.55], [0.7, 0.15, 0.55], [-0.7, 0.15, -0.55], [0.7, 0.15, -0.55]].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#333" />
          </mesh>
        ))}
      </group>
    );
  }

  if (type === "bike") {
    return (
      <group ref={ref}>
        {/* Frame */}
        <mesh position={[0, 0.5, 0]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[1.5, 0.1, 0.15]} />
          <meshStandardMaterial color="#ff5722" roughness={0.3} metalness={0.6} />
        </mesh>
        {/* Front wheel */}
        <mesh position={[0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.25, 0.05, 8, 24]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Rear wheel */}
        <mesh position={[-0.6, 0.25, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.25, 0.05, 8, 24]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        {/* Seat */}
        <mesh position={[-0.1, 0.7, 0]}>
          <boxGeometry args={[0.4, 0.08, 0.2]} />
          <meshStandardMaterial color="#111" />
        </mesh>
        {/* Handlebar */}
        <mesh position={[0.5, 0.8, 0]}>
          <boxGeometry args={[0.05, 0.3, 0.4]} />
          <meshStandardMaterial color="#888" metalness={0.8} />
        </mesh>
      </group>
    );
  }

  // Bus
  return (
    <group ref={ref}>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[3, 1, 1.2]} />
        <meshStandardMaterial color="#2196f3" roughness={0.3} metalness={0.4} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[2.6, 0.5, 1.1]} />
        <meshStandardMaterial color="#1565c0" roughness={0.1} metalness={0.6} />
      </mesh>
      {/* Windows */}
      {[-0.8, -0.3, 0.2, 0.7].map((x, i) => (
        <mesh key={i} position={[x, 1.3, 0.56]}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshStandardMaterial color="#80deea" roughness={0.1} metalness={0.9} />
        </mesh>
      ))}
      {/* Wheels */}
      {[[-1, 0.15, 0.65], [1, 0.15, 0.65], [-1, 0.15, -0.65], [1, 0.15, -0.65]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.12, 16]} />
          <meshStandardMaterial color="#333" />
        </mesh>
      ))}
    </group>
  );
};

export default VehicleModel;
