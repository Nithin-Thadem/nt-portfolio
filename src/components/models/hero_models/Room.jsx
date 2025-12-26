import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { EffectComposer, SelectiveBloom } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { usePerformanceMode, getQualitySettings } from "../../../utils/modelLoader";

export function Room(props) {
    // Refs for character, screens, and planet
    const groupRef = useRef();
    const screensRef = useRef();

    // Performance monitoring
    const performanceMode = usePerformanceMode();
    const quality = getQualitySettings(performanceMode);

    // Load the GLB models (original high-quality versions)
    const characterGltf = useGLTF("/models/nit.glb");
    const screenGltf = useGLTF("/models/scrn.glb");

    // Extract animations for the character
    const { actions } = useAnimations(characterGltf.animations, groupRef);

    // Cache geometry references using useMemo (performance optimization)
    const geometries = useMemo(() => {
        const findChild = (name) =>
            characterGltf.scene.children.find((child) => child.name === name);

        const body = findChild("avaturn_body");
        const hair = findChild("avaturn_hair_0");
        const look = findChild("avaturn_look_0");
        const shoes = findChild("avaturn_shoes_0");
        const glasses = findChild("avaturn_glasses_0");

        return {
            body: body?.geometry,
            hair: hair?.geometry,
            look: look?.geometry,
            shoes: shoes?.geometry,
            glasses: glasses?.geometry,
        };
    }, [characterGltf]);

    // Use existing materials from the .glb files (cached)
    const materials = useMemo(() => ({
        body: characterGltf.materials?.avaturn_body_material,
        hair: characterGltf.materials?.avaturn_hair_0_material,
        look: characterGltf.materials?.avaturn_look_0_material,
        shoes: characterGltf.materials?.avaturn_shoes_0_material,
        glasses: characterGltf.materials?.avaturn_glasses_0_material ||
            new THREE.MeshStandardMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.8,
            }),
    }), [characterGltf]);

    // Play animations when the component mounts
    useEffect(() => {
        if (actions) {
            Object.values(actions).forEach((action) => {
                try {
                    action.play();
                } catch (error) {
                    console.warn(`Failed to play animation: ${error.message}`);
                }
            });
        }
    }, [actions]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            characterGltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.geometry?.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((m) => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
            screenGltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.geometry?.dispose();
                    if (child.material) {
                        if (Array.isArray(child.material)) {
                            child.material.forEach((m) => m.dispose());
                        } else {
                            child.material.dispose();
                        }
                    }
                }
            });
        };
    }, [characterGltf, screenGltf]);

    return (
        <group {...props}>
            {/* Sharper lighting with increased black point and reduced glare */}
            <ambientLight intensity={0.1} color="#ffffff" />
            <directionalLight
                position={[2, 3, 2]}
                intensity={1.2}
                color="#ffffff"
                castShadow
            />
            <directionalLight
                position={[-2, 2, -1]}
                intensity={0.4}
                color="#ffffff"
            />
            <pointLight
                position={[5, 5, 5]}
                intensity={1.0}
                color="#ffffff"
            />
            <spotLight
                position={[0, 8, 4]}
                angle={0.4}
                penumbra={0.3}
                intensity={0.8}
                color="#ffffff"
            />

            {/* Render the screen model as background */}
            <mesh
                ref={screensRef}
                position={[0, 5, -26]}
                scale={25}
            >
                <primitive object={screenGltf.scene} />
            </mesh>

            {/* Conditionally render SelectiveBloom based on performance */}
            {quality.postprocessing && screensRef.current && (
                <EffectComposer multisampling={0}>
                    <SelectiveBloom
                        selection={screensRef.current}
                        intensity={quality.bloomIntensity}
                        luminanceThreshold={0.3}
                        luminanceSmoothing={0.7}
                        blendFunction={BlendFunction.ADD}
                    />
                </EffectComposer>
            )}

            {/* Group for character animations */}
            <group ref={groupRef} scale={3.0} position={[0, 0, 0]}>
                {/* Render the avatar body */}
                <mesh
                    geometry={geometries.body}
                    material={materials.body}
                >
                    <primitive object={characterGltf.scene} />
                </mesh>

                {/* Render the first hairstyle */}
                <mesh
                    geometry={geometries.hair}
                    material={materials.hair}
                />

                {/* Render the facial features ("look") */}
                <mesh
                    geometry={geometries.look}
                    material={materials.look}
                />

                {/* Render the shoes */}
                <mesh
                    geometry={geometries.shoes}
                    material={materials.shoes}
                />

                {/* Render the glasses */}
                {geometries.glasses && (
                    <mesh
                        geometry={geometries.glasses}
                        material={materials.glasses}
                    />
                )}
            </group>
        </group>
    );
}

// Preload all models
useGLTF.preload("/models/nit.glb");
useGLTF.preload("/models/scrn.glb");
