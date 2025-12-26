import { certifications } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

const Certifications = () => {
  return (
    <section id="certifications" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        {/* Title Header */}
        <TitleHeader
          title="My Certifications"
          sub="📜 Highlights of my professional achievements"
        />

        {/* Certifications Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-16">
          {certifications.map((certification, index) => {
            console.log("Certification:", certification); // Debug log
            return (
              <GlowCard key={index} card={certification}>
                {/* Certification Image */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={certification.imgPath}
                    alt={`${certification.name} Certification`}
                    loading="lazy"
                    className="size-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold">{certification.name}</p>
                    <p className="text-white-50">{certification.issuer}</p>
                  </div>
                </div>

                {/* Certification Details */}
                <div className="space-y-2">
                  <p className="text-sm text-white-50">
                    <strong>ID:</strong> {certification.id}
                  </p>
                  <p className="text-sm text-white-50">
                    <strong>Date:</strong> {certification.date}
                  </p>
                  {certification.url ? (
                    <a
                      href={certification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline relative"
                    >
                      View Certification
                    </a>
                  ) : (
                    <span className="text-red-500">Verification link unavailable</span>
                  )}
                </div>
              </GlowCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Certifications;