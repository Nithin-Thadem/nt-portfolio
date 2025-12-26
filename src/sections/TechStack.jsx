import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useEffect } from "react";

import TitleHeader from "../components/TitleHeader";
import TechIconCardExperience from "../components/models/tech_logos/TechIconCardExperience";
import { techStackIcons } from "../constants";

const TechStack = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Lazy load tech stack section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );

    const element = document.getElementById('skills');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  // Animate the tech cards in the skills section
  useGSAP(() => {
    if (!isVisible) return;

    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
          once: true,
        },
      }
    );
  }, [isVisible]);

  return (
    <div id="skills" className="flex-center section-padding" data-load-trigger="lazy">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="How I Can Contribute & My Key Skills"
          sub="What I Bring to the Table"
        />
        <div className="tech-grid">
          {techStackIcons.map((techStackIcon) => (
            <div
              key={techStackIcon.name}
              className="card-border tech-card overflow-hidden group xl:rounded-full rounded-lg"
            >
              <div className="tech-card-animated-bg" />
              <div className="tech-card-content">
                <div className="tech-icon-wrapper">
                  {isVisible ? (
                    <TechIconCardExperience model={techStackIcon} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="loading-pulse w-16 h-16"></div>
                    </div>
                  )}
                </div>
                <div className="padding-x w-full">
                  <p>{techStackIcon.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;
