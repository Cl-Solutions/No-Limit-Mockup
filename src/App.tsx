import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import VehicleShowcase from './components/VehicleShowcase';
import Classes from './components/Classes';
import Seminars from './components/Seminars';
import Team from './components/Team';
import Hours from './components/Hours';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-[#0A0A0A] min-h-screen transition-colors duration-300">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Process />
          <VehicleShowcase />
          <Classes />
          <Seminars />
          <Team />
          <Hours />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
