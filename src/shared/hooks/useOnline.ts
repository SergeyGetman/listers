import { useEffect, useState } from 'react';

const useOnline = () => {
  const [online, setOnline] = useState(true);

  const handleOffline = () => setOnline(false);
  const handleOnline = () => setOnline(true);

  useEffect(() => {
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return online;
};

export default useOnline;
