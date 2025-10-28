import { createContext, useContext } from 'react';
import { useSiteConfig } from './useSiteConfig';

const SiteConfigContext = createContext();

export const SiteConfigProvider = ({ children }) => {
  const configData = useSiteConfig();
  return (
    <SiteConfigContext.Provider value={configData}>
      {children}
    </SiteConfigContext.Provider>
  );
};

export const useSiteConfigContext = () => {
  const context = useContext(SiteConfigContext);
  if (!context) {
    throw new Error('useSiteConfigContext must be used within a SiteConfigProvider');
  }
  return context;
};
