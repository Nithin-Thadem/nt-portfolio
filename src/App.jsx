import { lazy, Suspense } from "react";
import { useGLTF } from "@react-three/drei";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import Navbar from "./components/NavBar";
import ScrollProgress from "./components/ScrollProgress";
import ScrollToTop from "./components/ScrollToTop";
import InfraStatus from "./components/InfraStatus";
import Footer from "./sections/Footer";
import { ToastProvider } from "./components/Toast";
import { Routes, Route } from "react-router-dom";

// Direct imports (no lazy loading to prevent scroll issues)
import Experience from "./sections/Experience";
import Certifications from "./sections/Certifications";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";
import Contact from "./sections/Contact";

// Configure Draco decoder for compressed 3D models
useGLTF.setDecoderPath("/draco/gltf/");

// Only lazy load route-based pages
const TermsAndConditions = lazy(() => import("./sections/TermsAndConditions"));

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
            <Route path="/terms-and-conditions" element={
                <Suspense fallback={<div className="min-h-screen" />}>
                    <TermsAndConditions />
                </Suspense>
            } />
        </Routes>
    </ToastProvider>
);

export default App;
