export default function Overlays() {
  return (
    <>
      <div className="scanlines" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <div className="hud-frame hud-frame--tl" aria-hidden="true" />
      <div className="hud-frame hud-frame--tr" aria-hidden="true" />
      <div className="hud-frame hud-frame--bl" aria-hidden="true" />
      <div className="hud-frame hud-frame--br" aria-hidden="true" />
    </>
  );
}
