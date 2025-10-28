let cachedConfig = null
const ADMIN_URI = import.meta.env.VITE_ADMIN_URI || 'http://localhost:5000/api/'
export const loadSiteConfig = async () => {
  if (cachedConfig) return cachedConfig

  try {
    const response = await fetch(`${ADMIN_URI}/site-config`, {
      headers: {
        Authorization: `Bearer ${
          import.meta.env.VITE_ADMIN_TOKEN || localStorage.getItem('auth_token')
        }`,
      },
    })
    if (!response.ok)
      throw new Error(`Failed to load config: ${response.status}`)

    const configObject = (await response.json()).data // ✅ no eval
    cachedConfig = configObject
    console.log('Loaded site config:', configObject)
    return configObject
  } catch (error) {
    console.error('Error loading site config:', error)
    return getDefaultConfig()
  }
}

export const getSiteConfig = () => {
  if (!cachedConfig)
    throw new Error('Config not loaded yet. Use loadSiteConfig() first.')
  return cachedConfig
}

function getDefaultConfig() {
  return {
    siteName: 'Portfolio',
    siteDescription: 'Portfolio Website',
    copyright: '© 2025 Portfolio. All rights reserved.',
    navigation: { logo: 'Portfolio', menuItems: [] },
    sections: {},
    hero: { greeting: 'Hello', name: 'Developer', title: 'Developer' },
    personalDetails: { title: 'About', content: 'About me' },
    workExperience: { title: 'Experience', experiences: [] },
    education: { title: 'Education', degrees: [] },
    skills: { title: 'Skills', categories: [] },
    projects: { title: 'Projects', projects: [] },
    achievements: { title: 'Achievements', achievements: [] },
    careerGoals: { title: 'Goals', goals: [] },
    socialLinks: { title: 'Connect', links: [] },
    testimonials: { title: 'Testimonials', testimonials: [] },
    contact: { title: 'Contact', email: 'contact@example.com' },
    footer: { title: 'Footer', description: 'Footer content' },
  }
}
