import { motion } from 'framer-motion'
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

export const Footer = () => {
  const { config } = useSiteConfigContext()
  const { footer, siteName, copyright } = config

  return (
    <motion.footer
      className='footer'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className='footer-content'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <motion.div className='footer-section' variants={fadeInUp}>
          <h3>{footer.title}</h3>
          <p>{footer.description}</p>
        </motion.div>

        <motion.div className='footer-section' variants={fadeInUp}>
          <h4>Quick Links</h4>
          <ul className='footer-links'>
            {footer.quickLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className='footer-section' variants={fadeInUp}>
          <h4>Connect</h4>
          <div className='footer-social'>
            {footer.socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <i className={link.icon}></i>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className='footer-bottom'
        variants={fadeInUp}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <p>&copy; {copyright}</p>
      </motion.div>
    </motion.footer>
  )
}
