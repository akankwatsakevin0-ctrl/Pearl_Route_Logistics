import type { Metadata } from "next";
import TrackingForm from "@/components/TrackingForm";

export const metadata: Metadata = {
  title: "Track a shipment",
  description: "Enter your tracking number for live shipment status.",
  alternates: { canonical: "/tracking" },
};

export default function Tracking() {
  return (
    <div className="section">
      <div className="container" style={{ maxWidth: 760 }}>
        <span className="eyebrow">Tracking</span>
        <h1>Where is my cargo?</h1>
        <p>Enter your tracking number to see live status and milestones.</p>
        <TrackingForm />
      </div>
    </div>
  );
}
