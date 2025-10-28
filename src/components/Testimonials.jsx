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

export const Testimonials = () => {
  const { config } = useSiteConfigContext()
  const { testimonials } = config

  return (
    <motion.section
      id='testimonials'
      className='testimonials'
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
        {testimonials.title}
      </motion.h2>

      <motion.div
        className='testimonials-grid'
        variants={staggerContainer}
        initial='initial'
        whileInView='animate'
        viewport={{ once: true }}
      >
        {testimonials.testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            className='testimonial-card'
            variants={fadeInUp}
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className='testimonial-content'>
              <div className='stars'>
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <i key={starIndex} className='fas fa-star'></i>
                ))}
              </div>
              <p className='testimonial-text'>"{testimonial.content}"</p>
            </div>

            <div className='testimonial-author'>
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className='author-avatar'
              />
              <div className='author-info'>
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
