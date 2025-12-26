import React, { useEffect } from 'react';
import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
import { EffectComposer, SelectiveBloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export default function HeroLights({ bloomSelection = [] }) {
    // Initialize the RectAreaLight shader chunk once
    useEffect(() => {
        RectAreaLightUniformsLib.init();
    }, []);

    return (
        <>
            {/* Soft overall fill - reduced for deeper blacks */}
            <hemisphereLight skyColor="#ffffff" groundColor="#111111" intensity={0.15} />

            {/* Key light - reduced for less glare */}
            <spotLight
                position={[5, 6, 5]}
                angle={0.4}
                penumbra={0.5}
                intensity={0.2}
                castShadow={true}
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
            />

            {/* Fill light - reduced */}
            <spotLight
                position={[-4, 4, 6]}
                angle={0.6}
                penumbra={1}
                intensity={0.2}
                color="#88aaff"
            />

            {/* Rim/backlight - reduced */}
            <spotLight
                position={[0, 6, -6]}
                angle={0.5}
                penumbra={0.3}
                intensity={0.3}
                color="#ffddaa"
            />

            {/* Soft "fill‐panel" area light - reduced intensity */}
            <primitive
                object={new THREE.RectAreaLight('#a259ff', 2, 3, 2)}
                position={[1, 2, 4]}
                rotation={[-Math.PI / 4, Math.PI / 4, 0]}
            />

            {/* Subtle point lights - reduced */}
            <pointLight position={[0, 4, 0]} intensity={0.3} color="#ffffff" />
            <pointLight position={[1, 2, -2]} intensity={0.3} color="#ffffff" />

            {/* Optional bloom on your screens/meshes - reduced */}
            {bloomSelection && (
                <EffectComposer>
                    <SelectiveBloom
                        selection={bloomSelection}
                        intensity={0.6}
                        luminanceThreshold={0.4}
                        luminanceSmoothing={0.9}
                        blendFunction={BlendFunction.ADD}
                    />
                </EffectComposer>
            )}
        </>
    );
}