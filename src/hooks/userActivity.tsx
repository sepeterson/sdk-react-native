import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
import { sendActive } from '../api/apiMutations';
import { userSendActiveIntervalMs } from '../utils/config';

/* hook for following user focus on component, if user have open app and component is mounted user active mutation is
 sending every 10s otherwise sending inactive mutation */

const useUserActivity = () => {
  const appState = useRef(AppState.currentState);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => {
    interval.current = setInterval(
      () => sendActive(true).catch(() => {}),
      userSendActiveIntervalMs
    );
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (interval.current) {
          clearInterval(interval.current);
        }
        sendActive(true).catch(() => {});
        interval.current = setInterval(
          () => sendActive(true).catch(() => {}),
          userSendActiveIntervalMs
        );
      }
      if (
        appState.current === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        if (interval.current) {
          clearInterval(interval.current);
        }
        sendActive(false).catch(() => {});
      }

      appState.current = nextAppState;
    });

    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
      sendActive(false).catch(() => {});
      subscription.remove();
    };
  }, []);
};

export default useUserActivity;
