import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/LandingPage/HeroSection";
import LandingPageNavbar from "../components/LandingPage/LandingPageNavbar";
import Mission from "../components/LandingPage/Mission";
import LandingPageFindTutors from "../components/LandingPage/LandingPageFindTutors";
import FAQ from "../components/LandingPage/FAQ";
import Footer from "../components/LandingPage/Footer";

/**
 * Home page component that serves as the main landing page for SkillSync
 * This page provides an overview of the platform and serves visitors who are not yet logged in
 * 
 * Features:
 * - Hero section with main call-to-action
 * - Mission statement and platform overview
 * - Preview of tutor browsing functionality
 * - FAQ section for common questions
 * - Responsive navbar with scroll effects
 * - Smooth scrolling between sections
 * - Mobile-optimized layout
 */
const Home = () => {
  // State to track if user has scrolled (for navbar styling effects)
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Ref to the main scroll container for scroll event handling
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Effect to handle navbar shadow appearance on scroll
  // This provides visual feedback when user scrolls down the page
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        // Add shadow to navbar when scrolled past top
        setIsScrolled(scrollContainerRef.current.scrollTop > 0);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      // Add scroll event listener
      container.addEventListener("scroll", handleScroll);
      // Cleanup listener on component unmount
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full flex flex-col items-center justify-start h-screen overflow-y-auto"
    >
      {/* Anchor for home section navigation */}
      <div id="home"></div>
      
      {/* Navigation bar with scroll-based styling */}
      <LandingPageNavbar isScrolled={isScrolled} />
      
      {/* Main hero section with primary call-to-action */}
      <HeroSection />
      
      {/* Decorative divider (hidden on mobile) */}
      <div className="w-full border-t border-lines max-w-[1300px] mx-auto px-8 max-lg:px-4 mb-10 max-md:hidden  "></div>
      
      {/* Mission section with platform overview */}
      <div id="mission" className="w-full scroll-mt-24">
        <Mission />
      </div>
      
      {/* Tutors preview section */}
      <div id="tutors" className="w-full scroll-mt-24">
        <LandingPageFindTutors />
      </div>
      
      {/* FAQ section for common questions */}
      <div id="faq" className="w-full scroll-mt-24">
        <FAQ />
      </div>
      
      {/* Footer with additional links and information */}
      <Footer />
    </div>
  );
};

export default Home;
