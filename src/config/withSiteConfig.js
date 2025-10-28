import { useSiteConfig } from './useSiteConfig';

// Higher-order component that provides site config to any component
export const withSiteConfig = (WrappedComponent) => {
  return function WithSiteConfigComponent(props) {
    const { config, loading, error } = useSiteConfig();

    if (loading) {
      return <div className="loading-placeholder">Loading...</div>;
    }

    if (error) {
      return <div className="error-placeholder">Error loading config</div>;
    }

    if (!config) {
      return null;
    }

    return <WrappedComponent {...props} siteConfig={config} />;
  };
};
