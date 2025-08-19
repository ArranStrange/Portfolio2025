import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/seo';

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPageView(location.pathname);
  }, [location.pathname]);

  return null;
};

export default Analytics;
