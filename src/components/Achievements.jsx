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

export const Achievements = () => {
  const { config } = useSiteConfigContext()
  const { achievements } = config

  return (
    <motion.section
      id='achievements'
      className='achievements'
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
        {achievements.title}
      </motion.h2>

      <motion.div
        className='achievements-grid'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {achievements.achievements.map((achievement, index) => (
          <motion.div
            key={index}
            className='achievement-card'
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className='achievement-header'>
              <span className='achievement-badge'>{achievement.badge}</span>
              <div className='achievement-info'>
                <h3>{achievement.title}</h3>
                <p className='achievement-issuer'>{achievement.issuer}</p>
                <span className='achievement-date'>{achievement.date}</span>
              </div>
            </div>
            <p className='achievement-description'>{achievement.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
