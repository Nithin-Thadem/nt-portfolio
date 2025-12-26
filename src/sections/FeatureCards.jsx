import { useRef } from "react";
import { abilities } from "../constants";

const FeatureCards = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (index) => (e) => {
    const cardElement = cardRefs.current[index];
    if (!cardElement) return;

    const rect = cardElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
    angle = (angle + 360) % 360;

    cardElement.style.setProperty("--start", angle + 60);
  };

  return (
    <div className="w-full padding-x-lg">
      <div className="mx-auto grid-3-cols">
        {abilities.map(({ imgPath, title, desc }, index) => (
          <div
            key={title}
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={handleMouseMove(index)}
            className="card card-border rounded-xl p-8 flex flex-col gap-4"
          >
            <div className="glow"></div>
            <div className="size-14 flex items-center justify-center rounded-full">
              <img src={imgPath} alt={title} loading="lazy" />
            </div>
            <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
            <p className="text-white-50 text-lg">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;