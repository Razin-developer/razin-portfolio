import { motion } from 'framer-motion'
import { useState } from 'react'
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

export const Contact = () => {
  const { config } = useSiteConfigContext()
  const { contact } = config
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: '',
    })

    try {
      // Create WhatsApp message
      const whatsappMessage = `Hi! I'm ${formData.name} (${formData.email}). ${
        formData.subject ? `Subject: ${formData.subject}` : ''
      } Message: ${formData.message}`
      const whatsappUrl = `https://wa.me/${contact.whatsapp.replace(
        /\D/g,
        ''
      )}?text=${encodeURIComponent(whatsappMessage)}`

      // Create email message
      const emailSubject = formData.subject || `Contact from ${formData.name}`
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      const emailUrl = `mailto:${contact.email}?subject=${encodeURIComponent(
        emailSubject
      )}&body=${encodeURIComponent(emailBody)}`

      // Open both WhatsApp and email
      window.open(whatsappUrl, '_blank')
      window.open(emailUrl, '_blank')

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: contact.form.successMessage,
      })

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: contact.form.errorMessage,
      })
    }
  }

  return (
    <motion.section
      id='contact'
      className='contact'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial='initial'
        animate='animate'
        viewport={{ once: true }}
      >
        {contact.title}
      </motion.h2>

      <motion.p className='contact-subtitle' variants={fadeInUp}>
        {contact.subtitle}
      </motion.p>

      <motion.div className='contact-content' variants={fadeInUp}>
        {/* Contact Methods */}
        <div className='contact-methods'>
          {contact.contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.action}
              className='contact-method'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={method.icon}></i>
              <div>
                <h4>{method.label}</h4>
                <p>{method.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form */}
        {contact.form.enabled && (
          <motion.form className='contact-form' onSubmit={handleSubmit}>
            {contact.form.fields.map((field, index) =>
              field.type === 'textarea' ? (
                <motion.textarea
                  key={index}
                  name={field.name}
                  placeholder={`${field.label}...`}
                  required={field.required}
                  whileFocus={{ scale: 1.02 }}
                  onChange={handleInputChange}
                  value={formData[field.name] || ''}
                />
              ) : (
                <motion.input
                  key={index}
                  type={field.type}
                  name={field.name}
                  placeholder={`${field.label}...`}
                  required={field.required}
                  whileFocus={{ scale: 1.02 }}
                  onChange={handleInputChange}
                  value={formData[field.name] || ''}
                />
              )
            )}

            <motion.button
              className='submit-btn'
              type='submit'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={formStatus.submitting}
            >
              {formStatus.submitting ? 'Sending...' : contact.form.submitText}
            </motion.button>

            {formStatus.message && (
              <motion.div
                className={`form-status ${
                  formStatus.success ? 'success' : 'error'
                } `}
              >
                {formStatus.message}
              </motion.div>
            )}
          </motion.form>
        )}
      </motion.div>
    </motion.section>
  )
}
