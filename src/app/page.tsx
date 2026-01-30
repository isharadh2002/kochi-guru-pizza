import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      <main>
        {/* Logo */}
        <Image
          src="/logo/logo.svg"
          alt="Kochi Guru Pizza - Where Fire Meets Flavor"
          width={200}
          height={200}
          priority
          className="logo"
        />

        {/* Main Heading */}
        <h1>Kochi Guru Pizza</h1>

        {/* Tagline */}
        <p className="tagline">Where Fire Meets Flavor</p>

        {/* Under Development Message */}
        <div className="coming-soon">
          <h2>Website Under Development</h2>
          <p>
            We're building our online presence. Visit us on social media or find
            us on the map!
          </p>
        </div>

        {/* Social Links */}
        <div className="social-links">
          <a
            href="https://www.facebook.com/profile.php?id=61584009775210"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Visit our Facebook page"
          >
            <Image
              src="/assets/facebook-round-color-icon.svg"
              alt="Facebook"
              width={40}
              height={40}
            />
          </a>

          <a
            href="https://maps.app.goo.gl/jNvnyuP9FPJwmBXA8"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Find us on Google Maps"
          >
            <Image
              src="/assets/google-map-icon.svg"
              alt="Google Maps"
              width={40}
              height={40}
            />
          </a>
        </div>

        {/* Footer */}
        <div className="footer">
          <p>No.114, Basement Floor, Beliatta - Walasmulla Rd</p>
          <p>Walasmulla 82220, Sri Lanka</p>
          <p>
            © {new Date().getFullYear()} Kochi Guru Pizza. All rights reserved.
          </p>
        </div>
      </main>
    </div>
  );
}
