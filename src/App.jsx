import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import Certifications from "./sections/Certifications";
import TermsAndConditions from "./sections/TermsAndConditions";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import InfraStatus from "./components/InfraStatus";
import { ToastProvider } from "./components/Toast";
import { Routes, Route } from "react-router-dom";

const PortfolioPage = () => (
    <>
        <ScrollProgress />
        <Navbar />
        <Hero />
        <ShowcaseSection />
        <LogoShowcase />
        <FeatureCards />
        <Experience />
        <Certifications />
        <TechStack />
        <Testimonials />
        <Contact />
        <Footer />
        <ScrollToTop />
        <InfraStatus />
    </>
);

const App = () => (
    <ToastProvider>
        <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        </Routes>
    </ToastProvider>
);

export default App;
