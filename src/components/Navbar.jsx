import { motion } from 'framer-motion'
import { useSiteConfigContext } from '../config/SiteConfigContext.jsx'
import { useState } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const Navbar = () => {
  const { config } = useSiteConfigContext()
  const { navigation, sections } = config
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Filter menu items based on enabled sections
  const enabledMenuItems = navigation.menuItems.filter((item) => {
    const sectionKey = item.href.replace('#', '')
    switch (sectionKey) {
      case 'home':
        return sections.hero.enabled
      case 'about':
        return sections.personalDetails.enabled
      case 'experience':
        return sections.workExperience.enabled
      case 'education':
        return sections.education.enabled
      case 'skills':
        return sections.skills.enabled
      case 'projects':
        return sections.projects.enabled
      case 'achievements':
        return sections.achievements.enabled
      case 'goals':
        return sections.careerGoals.enabled
      case 'testimonials':
        return sections.testimonials.enabled
      case 'contact':
        return sections.contact.enabled
      default:
        return true
    }
  })

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      className='navbar'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className='logo'
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {navigation.logo}
      </motion.div>

      {/* Mobile Menu Button */}
      <motion.button
        className='mobile-menu-btn'
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
        aria-label='Toggle menu'
      >
        <motion.span
          className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}
          animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 0 : -8 }}
        />
        <motion.span
          className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}
          animate={{ opacity: isMenuOpen ? 0 : 1 }}
        />
        <motion.span
          className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}
          animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? 0 : 8 }}
        />
      </motion.button>

      {/* Desktop Navigation */}
      <motion.ul
        className='nav-links desktop-nav'
        variants={staggerContainer}
        initial='initial'
        animate='animate'
      >
        {enabledMenuItems.map((item, index) => (
          <motion.li
            key={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={item.href}>{item.name}</a>
          </motion.li>
        ))}
      </motion.ul>

      {/* Mobile Navigation */}
      <motion.div
        className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          height: isMenuOpen ? 'auto' : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.ul
          className='mobile-nav-links'
          variants={staggerContainer}
          initial='initial'
          animate={isMenuOpen ? 'animate' : 'initial'}
        >
          {enabledMenuItems.map((item, index) => (
            <motion.li
              key={index}
              variants={fadeInUp}
              whileTap={{ scale: 0.95 }}
            >
              <a href={item.href} onClick={closeMenu}>
                {item.name}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.nav>
  )
}
