export function MotionShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      style={{ animation: "routeReveal 220ms ease-out both" }}
      className={className}
    >
      {children}
    </div>
  );
}
