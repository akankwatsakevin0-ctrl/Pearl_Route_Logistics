"use client";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import type { MotionValue } from "framer-motion";
import Scene3D from "./Scene3D";

function mulberry32(a: number) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const PALETTE = ["#1b4278", "#2a5a9e", "#12305a", "#3a6fb8"];

function Stack({ progress }: { progress: MotionValue<number> }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const group = useRef<THREE.Group>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const items = useMemo(() => {
    const rnd = mulberry32(7);
    const arr: { fin: THREE.Vector3; start: THREE.Vector3; color: THREE.Color }[] = [];
    for (let iy = 0; iy < 3; iy++)
      for (let ix = 0; ix < 2; ix++)
        for (let iz = 0; iz < 4; iz++) {
          const fin = new THREE.Vector3((ix - 0.5) * 2.55, (iy - 1) * 1.05, (iz - 1.5) * 1.05);
          const start = fin.clone().add(new THREE.Vector3((rnd() - 0.5) * 14, 7 + rnd() * 4, (rnd() - 0.5) * 10));
          const accent = rnd() < 0.18;
          arr.push({ fin, start, color: new THREE.Color(accent ? "#ff6b35" : PALETTE[Math.floor(rnd() * PALETTE.length)]) });
        }
    return arr;
  }, []);

  useEffect(() => {
    const m = mesh.current;
    if (!m) return;
    items.forEach((it, i) => m.setColorAt(i, it.color));
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  }, [items]);

  useFrame(() => {
    const m = mesh.current;
    if (!m) return;
    const p = progress.get();
    const n = items.length;
    items.forEach((it, i) => {
      const t = ease(THREE.MathUtils.clamp((p - 0.04 - (i / n) * 0.55) / 0.3, 0, 1));
      dummy.position.lerpVectors(it.start, it.fin, t);
      dummy.scale.setScalar(0.4 + 0.6 * t);
      dummy.rotation.set(0, (1 - t) * 1.2, 0);
      dummy.updateMatrix();
      m.setMatrixAt(i, dummy.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
    if (group.current) group.current.rotation.y = -0.6 + p * 1.0;
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 8, 5]} intensity={1.5} />
      <group ref={group}>
        <instancedMesh ref={mesh} args={[undefined, undefined, items.length]} frustumCulled={false}>
          <boxGeometry args={[2.4, 1, 1]} />
          <meshStandardMaterial roughness={0.55} metalness={0.2} />
        </instancedMesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.7, 0]}>
          <circleGeometry args={[5, 48]} />
          <meshBasicMaterial color="#12305a" transparent opacity={0.6} />
        </mesh>
      </group>
    </>
  );
}

export default function ContainerScene({ progress }: { progress: MotionValue<number> }) {
  return (
    <Scene3D label="3D container stack assembling as you scroll" fps={30} camera={{ position: [6.5, 3.5, 8.5], fov: 40 }}>
      <Stack progress={progress} />
    </Scene3D>
  );
}
