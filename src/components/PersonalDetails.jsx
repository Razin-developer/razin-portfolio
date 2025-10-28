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

export const PersonalDetails = () => {
  const { config } = useSiteConfigContext()
  const { personalDetails } = config

  return (
    <motion.section
      id='about'
      className='personal-details'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {personalDetails.title}
      </motion.h2>

      <motion.div
        className='personal-content'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <motion.div className='personal-info' variants={fadeInUp}>
          <motion.div
            className='personal-image'
            style={{ backgroundImage: `url('${personalDetails.image}')` }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.p className='personal-description' variants={fadeInUp}>
            {personalDetails.content}
          </motion.p>
        </motion.div>

        <motion.div className='personal-highlights' variants={fadeInUp}>
          <h3>Key Highlights</h3>
          <ul>
            {personalDetails.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                variants={fadeInUp}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <i className='fas fa-check-circle'></i>
                {highlight}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
