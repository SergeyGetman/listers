interface IntervalConfigItem {
  item: {
    value: string;
    label: string;
  };
  callback: any;
}

export const createIntervalConfig = (callback: any, maxValue?: number): IntervalConfigItem[] => {
  const intervalConfig: IntervalConfigItem[] = [];
  const interval = maxValue ? maxValue : 100;
  for (let i = 1; i < interval; i++) {
    const timeString = i.toString();

    intervalConfig.push({
      item: {
        value: timeString,
        label: timeString,
      },
      callback: () => callback(timeString),
    });
  }

  return intervalConfig;
};
