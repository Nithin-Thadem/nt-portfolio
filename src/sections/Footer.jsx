import { socialImgs } from "../constants";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <Link
            to="/terms-and-conditions"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            Terms & Conditions
          </Link>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <a key={index} href={socialImg.url} target="_blank" rel="noopener noreferrer">
              <div className="icon">
                <img src={socialImg.imgPath} alt="social icon" />
              </div>
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Nithin Thadem. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;