import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Fleet from './components/Fleet';
import Process from './components/Process';
import VehicleShowcase from './components/VehicleShowcase';
import Reviews from './components/Reviews';
import Seminars from './components/Seminars';
import Team from './components/Team';
import Hours from './components/Hours';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:bg-[#E31E2D] focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-bold"
      >
        Zum Inhalt springen
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Fleet />
        <Process />
        <VehicleShowcase />
        <Reviews />
        <Seminars />
        <Team />
        <Hours />
      </main>
      <Footer />
    </div>
  );
}
