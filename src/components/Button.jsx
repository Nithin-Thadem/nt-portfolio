import gsap from "gsap";

/**
 * A modern CTA button component with gradient styling and animations.
 * Uses GSAP for smooth scrolling to avoid conflicts with Three.js render loop.
 */

const Button = ({ text, className, id, variant = "primary" }) => {
  const handleClick = (e) => {
    e.preventDefault();

    const target = document.getElementById(id || "counter");

    if (target) {
      const offset = window.innerHeight * 0.15;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

      // Use GSAP for smooth scrolling - doesn't conflict with Three.js
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: targetPosition, autoKill: false },
        ease: "power2.inOut",
      });
    }
  };

  // Primary variant - gradient background
  if (variant === "primary") {
    return (
      <button
        onClick={handleClick}
        className={`${className ?? ""} modern-cta-btn group`}
      >
        <span className="btn-gradient"></span>
        <span className="btn-content">
          <span className="btn-text">{text}</span>
          <span className="btn-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </span>
        <span className="btn-shine"></span>
      </button>
    );
  }

  // Secondary variant - outline style
  return (
    <button
      onClick={handleClick}
      className={`${className ?? ""} modern-cta-btn outline group`}
    >
      <span className="btn-border"></span>
      <span className="btn-content">
        <span className="btn-text">{text}</span>
        <span className="btn-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </span>
      </span>
    </button>
  );
};

export default Button;
