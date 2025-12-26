import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  useGSAP(() => {
    // Animation for the main section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Animations for each app showcase
    const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            once: true,
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase">
      <div className="w-full">
        <div className="showcaselayout">
          <div ref={rydeRef} className="first-project-wrapper">
            <div className="image-wrapper">
              <img src="/images/Restaurants-club.png" alt="Restaurants club Interface" loading="lazy" />
            </div>
            <div className="text-content">
              <h2>
                Aigot - Restaurants Club - Full-Stack Infrastructure Engineer & DevOps Lead
              </h2>
              <p className="text-white-50 md:text-xl">
                Building scalable, secure, and automated cloud infrastructure for Aigot Restaurants Club using GCP, Kubernetes, Terraform, and more.
              </p>
            </div>
          </div>

          <div className="project-list-wrapper overflow-hidden">
            <div className="project" ref={libraryRef}>
              <div className="image-wrapper bg-[#FFEFDB]">
                <img
                  src="/images/thoughtly-project.png"
                  alt="DevOps Automation at Zemoso (Thoughtly)"
                  loading="lazy"
                />
              </div>
              <h2>DevOps Automation at Zemoso (Thoughtly)</h2>
              <p className="text-white-30 md:text-">
                Building scalable, secure, and automated CI/CD pipelines with Jenkins, GitHub Actions, and Terraform for efficient software delivery.
              </p>
            </div>

            <div className="project" ref={ycDirectoryRef}>
              <div className="image-wrapper bg-[#FFE7EB]">
                <img src="/images/Cellino-biotech.png" alt="Infrastructure Maintenance at Cellinobio" loading="lazy" />
              </div>
              <h2>Infrastructure Maintenance at Cellinobio (Zemoso)</h2>
              <p className="text-white-50 md:text-">
                Automating cloud infrastructure and containerized applications using Kubernetes, Docker, and GCP for seamless operations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShowcase;
