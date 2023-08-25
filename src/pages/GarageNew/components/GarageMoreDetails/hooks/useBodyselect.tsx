import { useEffect, useState } from 'react';

export const useBodySelectFromVehicle = (bodyStyle: string) => {
  const [bodySt, setBodySt] = useState<any>('');

  useEffect(() => {
    if (bodyStyle) {
      const bodyStyleOptions = bodyStyle?.split('/')?.map((el: string, idx: number) => {
        return {
          value: el.toLowerCase(),
          label: el,
          isDisabled: false,
          key: idx,
        };
      }, {});
      setBodySt(bodyStyleOptions);
    }
  }, [bodyStyle]);

  return {
    bodySt,
  };
};
