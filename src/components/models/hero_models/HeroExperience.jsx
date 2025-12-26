import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Suspense } from "react";
import * as THREE from "three";

import { Room } from "./Room";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import LoadingScreen from "../../LoadingScreen";
import { useProgressiveLoad, usePerformanceMode, getQualitySettings } from "../../../utils/modelLoader";

const HeroExperience = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

    // Progressive loading - defer hero 3D by 1 second for faster initial paint
    const shouldLoad = useProgressiveLoad('deferred');

    // Performance monitoring
    const performanceMode = usePerformanceMode();
    const quality = getQualitySettings(performanceMode);

    // Show placeholder while waiting for deferred load
    if (!shouldLoad) {
        return (
            <div className="hero-placeholder">
                <div className="hero-placeholder-content">
                    <div className="loading-pulse"></div>
                </div>
            </div>
        );
    }

    return (
        <Canvas
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
            camera={{ position: [0, 0, 15], fov: 45 }}
            dpr={quality.pixelRatio}
            gl={{
                antialias: quality.antialias,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 0.9,
            }}
        >
            {/* Subtle blue ambient light - reduced for sharper contrast */}
            <ambientLight intensity={1.5} color="#90d4ff" />

            {/* Configure OrbitControls - zoom disabled to not interfere with page scroll */}
            <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 5}
                maxPolarAngle={Math.PI / 2}
            />

            <Suspense fallback={<LoadingScreen />}>
                <HeroLights />
                <Particles count={quality.particleCount} />
                <group
                    scale={isMobile ? 0.7 : 1}
                    position={[0, -3.5, 0]}
                    rotation={[0, 0, 0]}
                >
                    <Room />
                </group>
            </Suspense>
        </Canvas>
    );
};

export default HeroExperience;
