import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthProvider';

// Generuj unikalny session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();
  const lastTrackedPath = useRef<string>('');

  const trackEvent = useCallback(async (
    eventType: string,
    eventData: Record<string, any> = {}
  ) => {
    try {
      await supabase.from('analytics_events').insert({
        user_id: user?.id || null,
        event_type: eventType,
        event_data: eventData,
        page_url: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        session_id: getSessionId(),
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }, [user]);

  // Automatyczne śledzenie page views
  useEffect(() => {
    if (location.pathname !== lastTrackedPath.current) {
      lastTrackedPath.current = location.pathname;
      trackEvent('page_view', { 
        path: location.pathname,
        search: location.search,
      });
    }
  }, [location, trackEvent]);

  return {
    trackEvent,
    trackClick: (element: string, data?: Record<string, any>) => 
      trackEvent('click', { element, ...data }),
    trackConversion: (type: string, data?: Record<string, any>) => 
      trackEvent('conversion', { type, ...data }),
    trackSignup: (accountType: string) => 
      trackEvent('signup', { account_type: accountType }),
    trackBooking: (data: Record<string, any>) => 
      trackEvent('booking_completed', data),
    trackSearch: (query: string, filters?: Record<string, any>) => 
      trackEvent('search', { query, filters }),
  };
};

export default useAnalytics;