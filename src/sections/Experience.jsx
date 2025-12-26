import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Animate experience cards sliding in from left
    gsap.utils.toArray(".exp-card-wrapper").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          once: true,
        },
      });
    });

    // Animate each timeline line - grows top to bottom as you scroll
    gsap.utils.toArray(".timeline-line-container").forEach((container) => {
      const line = container.querySelector(".gradient-line");
      if (line) {
        gsap.fromTo(line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top top",
            ease: "none",
            scrollTrigger: {
              trigger: container.closest(".exp-card-wrapper"),
              start: "top 50%",
              end: "bottom 50%",
              scrub: true,
            },
          }
        );
      }
    });

    // Animate text elements fading in
    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
          once: true,
        },
      });
    });

    // Animate timeline cards sliding in from right
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 70%",
          once: true,
        },
      });
    });
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard card={card}>
                    <div className="flex justify-center items-center">
                      <img
                          src={card.imgPath}
                          alt="Company Logo"
                          loading="lazy"
                          className="max-w-full h-auto md:max-w-[200px] max-w-[150px] object-contain transition duration-300 hover:scale-105"
                      />
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline-logo relative z-50">
                        <img src={card.logoPath} alt={`${card.title} company logo`} loading="lazy" className="w-12 h-12 object-contain" />
                      </div>
                      <div className="timeline-line-container">
                        <div className="gradient-line" />
                      </div>
                    </div>
                    <div className="expText flex flex-col relative z-20">
                      <div>
                        <h1 className="font-bold text-4xl text-white mb-2">{card.title}</h1>
                        <div className="flex items-center gap-3 my-4">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30">
                            📅 {card.date}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-4 border-l-4 border-blue-500 pl-4">
                          Key Responsibilities
                        </h3>
                        <ul className="space-y-4 mt-6">
                          {card.responsibilities.map(
                            (responsibility, index) => (
                              <li key={index} className="flex items-start gap-3 text-gray-300 leading-relaxed">
                                <span className="text-blue-400 text-xl mt-1">▸</span>
                                <span className="text-lg">{responsibility}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
