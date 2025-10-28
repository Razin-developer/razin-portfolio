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

export const Education = () => {
  const { config } = useSiteConfigContext()
  const { education } = config

  return (
    <motion.section
      id='education'
      className='education'
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
        {education.title}
      </motion.h2>

      <motion.div
        className='education-timeline'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {education.degrees.map((degree, index) => (
          <motion.div
            key={index}
            className='education-item'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className='education-header'>
              <h3>{degree.degree}</h3>
              <div className='education-institution'>
                <span className='institution-name'>{degree.institution}</span>
                <span className='education-duration'>{degree.duration}</span>
              </div>
            </div>

            <p className='education-description'>{degree.description}</p>

            <div className='education-achievements'>
              <h4>Achievements:</h4>
              <ul>
                {degree.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>
                    <i className='fas fa-medal'></i>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
