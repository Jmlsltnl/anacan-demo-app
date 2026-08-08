import "./funnel.css";

export default function FunnelLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="a-page">
      <div className="a-screen">
        <div className="f-screen">{children}</div>
      </div>
    </div>
  );
}
