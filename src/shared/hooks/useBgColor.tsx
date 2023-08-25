import { useCallback } from 'react';
import theme from '../../theme/theme';

const colors: string[] = [
  theme.palette.case.main.yellow.high,
  theme.palette.case.main.orange.high,
  theme.palette.case.main.purple.high,
  theme.palette.case.main.gey.high,
  theme.palette.case.main.blue.high,
  theme.palette.primary.main,
  theme.palette.case.main.yellow.middle,
  theme.palette.case.main.purple.middle,
];

const useBgColor = () => {
  const bgColor = useCallback((id: number) => {
    if (id) {
      return colors[id % colors.length];
    }
    const rand = Math.floor(Math.random() * colors.length);
    return colors[rand];
  }, []);

  return { bgColor };
};

export default useBgColor;
