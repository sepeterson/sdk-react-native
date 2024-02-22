import { useEffect, useState } from 'react';
import {
  internetConnectionTestIntervalMs,
  internetConnectionTestUrl,
} from '../utils/config';

const useIsInternetConnection = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        const response = await fetch(internetConnectionTestUrl);
        if (response.status === 204) {
          setIsConnected(true);
        } else {
          setIsConnected(false);
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    checkInternetConnection();

    const interval = setInterval(
      checkInternetConnection,
      internetConnectionTestIntervalMs
    );

    return () => clearInterval(interval);
  }, []);

  return isConnected;
};

export default useIsInternetConnection;
