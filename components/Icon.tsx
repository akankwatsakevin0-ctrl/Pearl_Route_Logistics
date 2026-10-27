const paths: Record<string, React.ReactNode> = {
  ship: <><path d="M4 30l4 10h32l4-10H4z" /><path d="M12 30V18h24v12M24 18V8h8" /><path d="M2 44c4 3 8 3 12 0s8-3 12 0 8 3 12 0 8-3 10 0" /></>,
  box: <><path d="M24 4l18 9v22L24 44 6 35V13z" /><path d="M6 13l18 9 18-9M24 22v22" /></>,
  truck: <><path d="M4 12h26v22H4zM30 20h10l6 8v6H30z" /><circle cx="14" cy="36" r="4" /><circle cx="38" cy="36" r="4" /></>,
  doc: <><path d="M10 4h20l10 10v30H10z" /><path d="M30 4v10h10M16 24h18M16 31h18M16 38h10" /></>,
  chart: <><path d="M6 6v36h36" /><path d="M14 32l8-10 8 6 10-16" /><circle cx="40" cy="12" r="2" /></>,
};

export default function Icon({ name }: { name: string }) {
  return (
    <svg className="icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
