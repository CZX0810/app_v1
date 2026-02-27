import { Toaster } from '@/components/ui/sonner';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import JobTypes from './sections/JobTypes';
import MilitarySection from './sections/MilitarySection';
import Courses from './sections/Courses';
import Employment from './sections/Employment';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <JobTypes />
        <MilitarySection />
        <Courses />
        <Employment />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
