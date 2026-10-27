"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useFinePointer, usePrefersReduced } from "@/lib/use3d";

const MAX = 8; // degrees — hard cap per brief

export default function TiltCard({ children, id }: { children: React.ReactNode; id?: string }) {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [MAX, -MAX]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-MAX, MAX]), { stiffness: 200, damping: 20 });
  const fine = useFinePointer();
  const reduced = usePrefersReduced();
  const on = fine && !reduced;

  return (
    <div style={{ perspective: 900 }} id={id}>
      <motion.div
        className="card tilt"
        style={on ? { rotateX: rx, rotateY: ry } : undefined}
        onPointerMove={(e) => {
          if (!on) return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width - 0.5);
          py.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { px.set(0); py.set(0); }}
      >
        <div className="layer">{children}</div>
      </motion.div>
    </div>
  );
}
