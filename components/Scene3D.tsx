"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";

/** Drives the render loop at a capped FPS and only while visible + tab active. */
function Ticker({ fps, active }: { fps: number; active: boolean }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
    if (!active) return;
    const id = setInterval(() => invalidate(), 1000 / fps);
    return () => clearInterval(id);
  }, [fps, active, invalidate]);
  return null;
}

type Props = {
  children: React.ReactNode;
  label: string;
  fps?: number;
  camera?: { position: [number, number, number]; fov?: number };
};

export default function Scene3D({ children, label, fps = 30, camera }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    const vis = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", vis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div ref={ref} role="img" aria-label={label} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        frameloop="demand"
        dpr={[1, 1.5]}
        camera={{ position: camera?.position ?? [0, 0, 3.4], fov: camera?.fov ?? 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      >
        <Ticker fps={fps} active={inView && tabVisible} />
        {children}
      </Canvas>
    </div>
  );
}
