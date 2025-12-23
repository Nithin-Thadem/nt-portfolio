import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import Computer from "./Computer";

const ContactExperience = () => {
  return (
    <Canvas 
      shadows 
      camera={{ position: [0, 3, 7], fov: 45 }}
      onCreated={({ gl }) => {
        gl.setClearColor('#0E0E10'); // 👈 Set background to deep grey
      }}
    >
      {/* Base ambient light */}
      <ambientLight intensity={0.8} color="#ffffff" />

      {/* Main directional light from front-top */}
      <directionalLight
        position={[0, 5, 5]}
        intensity={3}
        color="#ffffff"
        castShadow
      />

      {/* Fill light from side */}
      <directionalLight
        position={[-3, 3, 3]}
        intensity={1}
        color="#ffffff"
        castShadow
      />

      <OrbitControls
        enableZoom={false}
        minPolarAngle={Math.PI / 5}
        maxPolarAngle={Math.PI / 2}
      />

      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -1.5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#0E0E10" /> {/* 👈 Floor matches background */}
        </mesh>
      </group>

      <group scale={0.03} position={[0, -1.49, -2]} castShadow receiveShadow>
        <Computer />
      </group>
    </Canvas>
  );
};

export default ContactExperience;