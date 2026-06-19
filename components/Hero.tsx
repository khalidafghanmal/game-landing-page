import Image from "next/image";
import HudFooter from "./HudFooter";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid">
        <section className="hero-content">
          <h1 className="hero-title">
            <span className="title-line">FUTURE IS</span>
            <span className="title-line">OUR BATTLEFIELD</span>
          </h1>
          <p className="hero-desc">
            Step into the next generation of combat. Advanced weapons.
            Ruthless enemies. One mission: <strong>Survive.</strong>
          </p>
          <div className="hero-actions">
            <button className="btn btn--primary" type="button">
              <svg className="btn-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Play Trailer
            </button>
            <button className="btn btn--ghost" type="button">
              <svg
                className="btn-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Wishlist Now
            </button>
          </div>
        </section>

        <section className="hero-character">
          <Image
            className="hero-operative"
            src="/operative.png"
            alt="VOIDSTRIKE operative in tactical gear and helmet"
            width={613}
            height={899}
            priority
          />
        </section>
      </div>
      <HudFooter />
    </section>
  );
}
