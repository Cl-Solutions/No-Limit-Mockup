import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Reviews from './components/Reviews';
import VehicleShowcase from './components/VehicleShowcase';
import Fleet from './components/Fleet';
import About from './components/About';
import Process from './components/Process';
import Seminars from './components/Seminars';
import Hours from './components/Hours';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-ink min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[1000] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:rounded-sm focus:text-sm focus:font-bold"
      >
        Zum Inhalt springen
      </a>
      <Navigation />
      <main id="main">
        {/* Hook + Sofort-Trust */}
        <Hero />
        <Reviews />

        {/* „Was bekomme ich?" */}
        <VehicleShowcase />
        <Fleet />

        {/* „Wer macht das?" — Story + Stats + Team in einer Sektion */}
        <About />

        {/* „Wie läuft's ab?" */}
        <Process />
        <Seminars />

        {/* CTA / Anmelden */}
        <Hours />
      </main>
      <Footer />
    </div>
  );
}
