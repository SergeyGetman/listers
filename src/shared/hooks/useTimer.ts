import { useCallback, useEffect, useState } from 'react';

const useTimer = () => {
  const [progressBarPercent, setProgressBarPercent] = useState<number>(0);
  const [time, setTime] = useState<number>();

  const [date, setDate] = useState<{
    startInMs: number;
    endInMs: number;
  } | null>(null);

  const [isActive, setIsActive] = useState(true);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isActive && date !== null) {
      timer = setInterval(() => {
        const now = new Date().getTime();
        const timeleft = date.endInMs - now;

        const seconds = Math.floor((timeleft % (1000 * 180)) / 1000);

        const diffStartAndEnd = date.endInMs - date.startInMs;
        const diffStartAndNow = now - date.startInMs;
        const persent =
          (diffStartAndNow / diffStartAndEnd) * 100 === Infinity
            ? 0
            : Math.floor((diffStartAndNow / diffStartAndEnd) * 100);
        if (timeleft < 1000) {
          setIsActive(false);
          if (seconds < 0) {
            setTime(0);
          } else {
            setTime(seconds);
          }

          setProgressBarPercent(100);
        } else {
          if (seconds < 0) {
            setTime(0);
          } else {
            setTime(seconds);
          }

          setProgressBarPercent(persent);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [date, isActive]);

  const getTime = useCallback(() => {
    return time;
  }, [time]);

  const stop = useCallback(() => {
    setIsActive(false);
    setDate(null);
  }, [setIsActive, setDate]);

  const start = useCallback(
    (initialData: { startInMs: number; endInMs: number }) => {
      setDate(initialData);
      setIsActive(true);
    },
    [setIsActive, setDate],
  );

  return { getTime, progressBarPercent, stop, start };
};

export default useTimer;
