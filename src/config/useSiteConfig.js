import { useState, useEffect } from 'react'
import { loadSiteConfig } from './configLoader'

export const useSiteConfig = () => {
  const [config, setConfig] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadConfig = async () => {
      try {
        setLoading(true)
        const siteConfig = await loadSiteConfig()

        setConfig(siteConfig)
        setError(null)
      } catch (err) {
        console.error('Failed to load site config:', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    loadConfig()
  }, [])

  return { config, loading, error }
}
