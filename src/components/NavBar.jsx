import { useState, useEffect } from "react";

import { navLinks } from "../constants";

const NavBar = () => {
  // track if the user has scrolled down the page
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // create an event listener for when the user scrolls
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    // add the event listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    // cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : "not-scrolled"}`}>
      <div className="inner">
        <a href="#hero" className="logo flex items-center gap-2">
          <span className="logo-text">
            <span className="logo-first">Nithin</span>
            <span className="logo-last">T</span>
          </span>
          <img
            src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
            alt="Animated wave"
            className="w-16 h-10 object-cover rounded hidden md:block"
          />
        </a>

        <nav className="desktop">
          <ul>
            {navLinks.map(({ link, name }) => (
              <li key={name} className="group">
                <a href={link}>
                  <span>{name}</span>
                  <span className="underline" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Desktop buttons */}
        <div className='hidden md:flex items-center gap-4'>
          <a
            href="/CV/cv.pdf"
            download="Nithin_CV.pdf"
            className="download-cv-btn group"
          >
            <span className="btn-bg"></span>
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </span>
            <span className="btn-text">Download CV</span>
          </a>
          <a href="#contact" className="contact-me-btn group">
            <span className="btn-bg"></span>
            <span className="btn-text">Contact Me</span>
            <span className="btn-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="M12 5l7 7-7 7"></path>
              </svg>
            </span>
          </a>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a href="#hero" className="mobile-logo" onClick={() => setMenuOpen(false)}>
            <span className="logo-first">Nithin</span>
            <span className="logo-last">T</span>
          </a>
          <nav>
            <ul>
              {navLinks.map(({ link, name }) => (
                <li key={name}>
                  <a href={link} onClick={() => setMenuOpen(false)}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu-buttons">
            <a
              href="/CV/cv.pdf"
              download="Nithin_CV.pdf"
              className="download-cv-btn mobile group"
              onClick={() => setMenuOpen(false)}
            >
              <span className="btn-bg"></span>
              <span className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </span>
              <span className="btn-text">Download CV</span>
            </a>
            <a
              href="#contact"
              className="contact-me-btn mobile group"
              onClick={() => setMenuOpen(false)}
            >
              <span className="btn-bg"></span>
              <span className="btn-text">Contact Me</span>
              <span className="btn-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
