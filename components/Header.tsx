import Link from "next/link";

const NAV_LINKS = [
  { href: "#", label: "HOME", active: true },
  { href: "#", label: "GAME" },
  { href: "#", label: "MODES" },
  { href: "#", label: "WEAPONS" },
  { href: "#", label: "MEDIA" },
  { href: "#", label: "COMMUNITY" },
];

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">
        <svg
          className="logo-icon"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 2L4 10v12l12 8 12-8V10L16 2z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M16 8l-6 4v8l6 4 6-4v-8l-6-4z"
            fill="currentColor"
            opacity="0.6"
          />
        </svg>
        <span>VOIDSTRIKE</span>
      </Link>

      <nav className="nav">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`nav-link${link.active ? " nav-link--active" : ""}`}
          >
            {link.active ? (
              <>
                <span className="nav-bracket">[</span>
                {link.label}
                <span className="nav-bracket">]</span>
              </>
            ) : (
              link.label
            )}
          </Link>
        ))}
      </nav>

      <div className="badge-pre-alpha">
        <span className="badge-stripe" aria-hidden="true" />
        <span>PRE-ALPHA</span>
      </div>
    </header>
  );
}
