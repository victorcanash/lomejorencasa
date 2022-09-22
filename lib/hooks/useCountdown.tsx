import { useState, useEffect, useRef, useCallback } from 'react';

const useCountdown = (triggerOnStart = true, targetTimeInSeconds = 30) => {
  const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
  const [active, setActive] = useState(false);

  const resendTimerIntervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const calculateTimeLeft = (finalTime: number) => {
    const difference = finalTime - +new Date();
    if (difference >= 0) {
      setTimeLeft(Math.round(difference / 1000));
    } else {
      setTimeLeft(undefined);
      clearInterval(resendTimerIntervalRef.current);
      setActive(false);
    }
  }

  const trigger = useCallback(() => {
    setActive(true);
    const finalTime = +new Date() + targetTimeInSeconds * 1000;
    resendTimerIntervalRef.current = setInterval(() => {
      calculateTimeLeft(finalTime)
    }, 1000);
  }, [targetTimeInSeconds]);

  useEffect(() => {
    if (triggerOnStart) {
      trigger();
    }
    return () => {
      clearInterval(resendTimerIntervalRef.current);
    };
  }, [trigger, triggerOnStart]);

  return {
    trigger,
    timeLeft,
    active,
  }
};

export default useCountdown;
