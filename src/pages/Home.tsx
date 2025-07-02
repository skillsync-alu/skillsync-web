import { useEffect, useState, useRef } from "react";
import HeroSection from "../components/LandingPage/HeroSection";
import LandingPageNavbar from "../components/LandingPage/LandingPageNavbar";
import Mission from "../components/LandingPage/Mission";
import LandingPageFindTutors from "../components/LandingPage/LandingPageFindTutors";
import FAQ from "../components/LandingPage/FAQ";
import Footer from "../components/LandingPage/Footer";

const Home = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // navbar shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        setIsScrolled(scrollContainerRef.current.scrollTop > 0);
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div
      ref={scrollContainerRef}
      className="w-full flex flex-col items-center justify-start h-screen overflow-y-auto"
    >
      <div id="home"></div>
      <LandingPageNavbar isScrolled={isScrolled} />
      <HeroSection />
      <div className="w-full border-t border-lines max-w-[1300px] mx-auto px-8 max-lg:px-4 mb-10 max-md:hidden  "></div>
      <div id="mission" className="w-full scroll-mt-24">
        <Mission />
      </div>
      <div id="tutors" className="w-full scroll-mt-24">
        <LandingPageFindTutors />
      </div>
      <div id="faq" className="w-full scroll-mt-24">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
