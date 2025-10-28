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

export const Skills = () => {
  const { config } = useSiteConfigContext()
  const { skills } = config

  return (
    <motion.section
      id='skills'
      className='skills'
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
        {skills.title}
      </motion.h2>

      <motion.div
        className='skills-grid'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {skills.categories.map((category, index) => (
          <motion.div
            key={index}
            className='skill-category'
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h3>{category.name}</h3>
            <div className='skills-list'>
              {category.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  className='skill-tag'
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
