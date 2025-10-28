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

export const Projects = () => {
  const { config } = useSiteConfigContext()
  const { projects } = config

  return (
    <motion.section
      id='projects'
      className='projects'
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
        {projects.title}
      </motion.h2>
      <motion.div
        className='project-grid'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {projects.projects.map((project, index) => (
          <motion.div
            key={index}
            className='project-card'
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className='project-image'
              style={{ backgroundImage: `url('${project.image}')` }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className='project-tech'>
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex}>{tech}</span>
              ))}
            </div>
            <div className='project-links'>
              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='project-link live'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className='fas fa-external-link-alt'></i>
                  Live Demo
                </motion.a>
              )}
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='project-link github'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className='fab fa-github'></i>
                  Code
                </motion.a>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
