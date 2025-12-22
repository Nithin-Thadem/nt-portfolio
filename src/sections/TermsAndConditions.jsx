import { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import TitleHeader from "../components/TitleHeader";
import "../index.css";

gsap.registerPlugin(ScrollTrigger);

const TermsAndConditions = () => {
  useGSAP(() => {
    // Animate the main content sections
    gsap.from(".terms-section", {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".terms-section",
        start: "top 80%",
      },
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="flex-center md:mt-40 mt-20 section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-5">
        <div className="max-w-4xl mx-auto">
          <TitleHeader
            title="Terms & Conditions"
            sub="📄 Legal Information"
          />
          
          <div className="mt-20 space-y-8">
            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">1. Purpose and Scope</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  This portfolio website ("Portfolio") showcases the professional work, skills, and experience of Nithin Thadem in the field of DevOps Engineering and Cloud Infrastructure. The information presented is for informational and demonstration purposes only.
                </p>
                <p>
                  The Portfolio includes descriptions of projects, work experiences, certifications, and technical skills. All content represents information available at the time of publication and may be subject to change.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property Rights</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  © {new Date().getFullYear()} Nithin Thadem. All rights reserved. This Portfolio and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Nithin Thadem or its licensors and are protected by copyright, trademark, and other intellectual property laws.
                </p>
                <p>
                  Third-party company logos, trademarks, and names displayed in this Portfolio are the property of their respective owners. These are used solely for the purpose of representing professional work experience and are used under fair use principles.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">3. Use of Information</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  Visitors are permitted to review and reference the Portfolio content for personal, non-commercial purposes. Any use of this Portfolio or its content for commercial purposes without explicit written permission is strictly prohibited.
                </p>
                <p>
                  Technical demonstrations, code snippets, and project descriptions may be referenced for educational purposes, with appropriate attribution to the original author (Nithin Thadem).
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">4. Disclaimer and Limitation of Liability</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  The information contained in this Portfolio is provided "as is" without warranty of any kind, either express or implied, including but not limited to the implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p>
                  Nithin Thadem makes no representations or warranties regarding the accuracy or reliability of the use of the materials on this Portfolio or otherwise relating to such materials or any sites linked to this Portfolio.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">5. Privacy</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  This Portfolio may collect certain personal information for analytics and improvement purposes. For detailed information about data collection and usage practices, please refer to our Privacy Policy section.
                </p>
                <p>
                  No personal information is shared with third parties without explicit consent, except as required by law.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">6. Third-Party Links</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  This Portfolio may contain links to third-party websites, services, or resources. These links are provided for convenience only and do not constitute an endorsement of the linked content.
                </p>
                <p>
                  Nithin Thadem is not responsible for the content, privacy policies, or practices of third-party websites.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact and Permissions</h2>
              <div className="text-gray-300 leading-relaxed space-y-3">
                <p>
                  For questions regarding these Terms & Conditions, or to request permission for use of Portfolio content beyond the scope outlined herein, please contact:
                </p>
                <div className="bg-black-200 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-white">Contact Information:</p>
                  <p>Email: Available through portfolio contact form</p>
                  <p>LinkedIn: Available through portfolio social links</p>
                </div>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">8. Changes to Terms</h2>
              <div className="text-gray-300 leading-relaxed">
                <p>
                  These Terms & Conditions may be updated periodically to reflect changes in the Portfolio content or legal requirements. The most current version will always be available on this page.
                </p>
              </div>
            </div>

            <div className="terms-section">
              <h2 className="text-2xl font-bold text-white mb-4">9. Effective Date</h2>
              <div className="text-gray-300 leading-relaxed">
                <p>
                  These Terms & Conditions are effective as of December 22, 2025, and govern all use of this Portfolio website.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/" 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-medium"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;