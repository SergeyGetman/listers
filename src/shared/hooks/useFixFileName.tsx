import { useCallback } from 'react';

const useFixFileName = () => {
  const fixFileName = useCallback((name: string, chars: number, subst: string) => {
    if (!!name === false) return '';
    const extension = name.split('.');

    if (name.length <= chars) {
      return name;
    }

    return `${name.split('.').slice(0, -1).join('.').slice(0, chars)}${subst}.${
      extension[extension.length - 1]
    }`;
  }, []);

  return { fixFileName };
};

export default useFixFileName;
