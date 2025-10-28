import { motion } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useSiteConfigContext } from '../config/SiteConfigContext.jsx'

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

export const Hero = () => {
  const { config } = useSiteConfigContext()
  const { hero, socialLinks } = config

  return (
    <motion.section
      id='home'
      className='hero'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className='hero-container'>
        <motion.div
          className='hero-content'
          variants={staggerContainer}
          initial='initial'
          animate='animate'
        >
          <motion.div className='hero-badge'>
            <span>{hero.greeting}</span>
          </motion.div>
          <motion.h1
            className='glitch'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            {hero.name}
          </motion.h1>
          <motion.h2 className='hero-subtitle' variants={fadeInUp}>
            {hero.title}
          </motion.h2>
          <motion.p className='hero-description' variants={fadeInUp}>
            {hero.description}
          </motion.p>

          <motion.div className='cta-buttons' variants={staggerContainer}>
            {hero.ctaButtons.map((button, index) => (
              <motion.a
                key={index}
                href={button.href}
                className={`cta-${button.type}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {button.text}
              </motion.a>
            ))}
          </motion.div>
          <motion.div className='social-links' variants={staggerContainer}>
            {socialLinks.links.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                style={{ color: link.color }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className='hero-image-container'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className='code-display'>
            <SyntaxHighlighter
              language='typescript'
              customStyle={{
                margin: 0,
                padding: '2rem',
                height: '100%',
                borderRadius: '20px',
                background: 'rgba(30, 41, 59, 0.8)',
                backdropFilter: 'blur(10px)',
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              {hero.codeDisplay}
            </SyntaxHighlighter>
          </div>

          <motion.div
            className='floating-card'
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className='card-content'>
              <span className='card-icon'>{hero.floatingCard.icon}</span>
              <span className='card-text'>{hero.floatingCard.text}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
