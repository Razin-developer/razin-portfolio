import './App.css'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { PersonalDetails } from './components/PersonalDetails'
import { WorkExperience } from './components/WorkExperience'
import { Education } from './components/Education'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Achievements } from './components/Achievements'
import { CareerGoals } from './components/CareerGoals'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { useEffect, useState } from 'react'
import {
  SiteConfigProvider,
  useSiteConfigContext,
} from './config/SiteConfigContext.jsx'

function AppContent() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { config, loading, error } = useSiteConfigContext()

  useEffect(() => {
    if (config && !loading) {
      setIsLoaded(true)
    }
  }, [config, loading])

  if (loading) {
    return (
      <div className='app loading'>
        <div className='loading-spinner'>
          <div className='spinner'></div>
          <p>Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='app error'>
        <div className='error-message'>
          <h2>Failed to load configuration</h2>
          <p>Please check if the config file exists in the public folder.</p>
        </div>
      </div>
    )
  }

  if (!config) return null

  const { sections } = config

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Navbar />

      {sections.hero.enabled && <Hero />}
      {sections.personalDetails.enabled && <PersonalDetails />}
      {sections.workExperience.enabled && <WorkExperience />}
      {sections.education.enabled && <Education />}
      {sections.skills.enabled && <Skills />}
      {sections.projects.enabled && <Projects />}
      {sections.achievements.enabled && <Achievements />}
      {sections.careerGoals.enabled && <CareerGoals />}
      {sections.testimonials.enabled && <Testimonials />}
      {sections.contact.enabled && <Contact />}
      {sections.footer.enabled && <Footer />}
    </div>
  )
}

function App() {
  return (
    <SiteConfigProvider>
      <AppContent />
    </SiteConfigProvider>
  )
}

export default App
