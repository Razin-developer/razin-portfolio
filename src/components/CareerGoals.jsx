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

export const CareerGoals = () => {
  const { config } = useSiteConfigContext()
  const { careerGoals } = config

  return (
    <motion.section
      id='goals'
      className='career-goals'
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
        {careerGoals.title}
      </motion.h2>

      <motion.div
        className='goals-content'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        <motion.div className='goals-section' variants={fadeInUp}>
          <h3>Career Goals</h3>
          <div className='goals-grid'>
            {careerGoals.goals.map((goal, index) => (
              <motion.div
                key={index}
                className='goal-card'
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className='goal-icon'>{goal.icon}</span>
                <h4>{goal.title}</h4>
                <p>{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div className='interests-section' variants={fadeInUp}>
          <h3>Areas of Interest</h3>
          <div className='interests-list'>
            {careerGoals.interests.map((interest, index) => (
              <motion.span
                key={index}
                className='interest-tag'
                variants={fadeInUp}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
