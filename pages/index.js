import Header from '../components/Header';
import AboutMe from '../components/AboutMe';
import Projects from '../components/Projects';
import Languages from '../components/Languages';
import Contact from '../components/Contact';
import ScrollProgress from '../components/ScrollProgress';
import BackToTop from '../components/BackToTop';
import ParticlesBackground from '../components/ParticlesBackground';

function Index() {
  return (
    <>
      <ParticlesBackground />
      <ScrollProgress />
      <BackToTop />
      <Header />
      <AboutMe />
      <Projects />
      <Languages />
      <Contact />
    </>
  )
}

export default Index;
