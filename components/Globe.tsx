"use client";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import Scene3D from "./Scene3D";
import { ports, routes } from "@/lib/brand";

const R = 1;

function toVec([lat, lon]: [number, number], r = R) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
}

function GlobeScene() {
  const group = useRef<THREE.Group>(null);
  const dots = useRef<(THREE.Mesh | null)[]>([]);

  const lite = typeof window !== "undefined" && window.innerWidth < 768;

  const pointsGeo = useMemo(() => {
    const n = lite ? 1200 : 2600;
    const pos = new Float32Array(n * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < n; i++) {
      const y = 1 - (i / (n - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      pos.set([Math.cos(th) * rad * 1.005, y * 1.005, Math.sin(th) * rad * 1.005], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [lite]);

  const arcs = useMemo(
    () =>
      routes.map(([a, b]) => {
        const va = toVec(ports[a]);
        const vb = toVec(ports[b]);
        const lift = 1 + va.distanceTo(vb) * 0.32;
        const mid = va.clone().add(vb).multiplyScalar(0.5).normalize().multiplyScalar(lift);
        const curve = new THREE.QuadraticBezierCurve3(va, mid, vb);
        const line = new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(curve.getPoints(48)),
          new THREE.LineBasicMaterial({ color: "#ff6b35", transparent: true, opacity: 0.55 })
        );
        return { curve, line };
      }),
    []
  );

  const portVecs = useMemo(() => Object.values(ports).map((p) => toVec(p, 1.012)), []);

  useFrame((state, delta) => {
    if (group.current) group.current.rotation.y += Math.min(delta, 0.1) * 0.12;
    const t = state.clock.elapsedTime;
    arcs.forEach((a, i) => {
      const m = dots.current[i];
      if (m) m.position.copy(a.curve.getPoint(((t * 0.12 + i * 0.37) % 1 + 1) % 1));
    });
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 3, 5]} intensity={1.6} />
      <group ref={group} rotation={[0.35, 0.6, 0]}>
        <mesh>
          <sphereGeometry args={[R, 48, 48]} />
          <meshStandardMaterial color="#0f2a50" roughness={0.9} metalness={0.1} />
        </mesh>
        <points geometry={pointsGeo}>
          <pointsMaterial color="#6f9be0" size={0.012} sizeAttenuation transparent opacity={0.8} />
        </points>
        {portVecs.map((v, i) => (
          <mesh key={i} position={v}>
            <sphereGeometry args={[0.02, 12, 12]} />
            <meshBasicMaterial color="#ff6b35" />
          </mesh>
        ))}
        {arcs.map((a, i) => (
          <group key={i}>
            <primitive object={a.line} />
            <mesh ref={(el) => { dots.current[i] = el; }}>
              <sphereGeometry args={[0.018, 10, 10]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        ))}
      </group>
      <mesh scale={1.12}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#3b78d8" transparent opacity={0.1} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

export default function Globe() {
  return (
    <Scene3D label="Rotating 3D globe with animated shipping routes between major ports" fps={30} camera={{ position: [0, 0, 3.3], fov: 45 }}>
      <GlobeScene />
    </Scene3D>
  );
}
