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

export const WorkExperience = () => {
  const { config } = useSiteConfigContext()
  const { workExperience } = config

  return (
    <motion.section
      id='experience'
      className='work-experience'
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
        {workExperience.title}
      </motion.h2>

      <motion.div
        className='experience-timeline'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {workExperience.experiences.map((experience, index) => (
          <motion.div
            key={index}
            className='experience-item'
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className='experience-header'>
              <h3>{experience.position}</h3>
              <div className='experience-company'>
                <span className='company-name'>{experience.company}</span>
                <span className='experience-duration'>
                  {experience.duration}
                </span>
              </div>
            </div>

            <p className='experience-description'>{experience.description}</p>

            <div className='experience-tech'>
              <h4>Technologies Used:</h4>
              <div className='tech-tags'>
                {experience.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className='tech-tag'>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className='experience-achievements'>
              <h4>Key Achievements:</h4>
              <ul>
                {experience.achievements.map((achievement, achIndex) => (
                  <li key={achIndex}>
                    <i className='fas fa-trophy'></i>
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
