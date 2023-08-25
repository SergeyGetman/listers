import { useCallback } from 'react';

const useYearOptions = () => {
  const getYears = useCallback((startYear: number): { value: string; label: string }[] => {
    const currentYear = new Date().getFullYear();
    const yearOpt = [];
    for (let i = currentYear; i >= startYear; i -= 1) {
      yearOpt.push({ label: i.toString(), value: i.toString() });
    }
    return yearOpt;
  }, []);

  return { getYears };
};

export default useYearOptions;
