import i18next from 'i18next';

export const generateSelectOptions = (enumArray: string[], i18Path: string, arrIsDisabledFilters?: any) => {
  return enumArray.map((item) => ({
    value: item,
    label: i18next.t(`${i18Path}.${item}`),
    isDisabled: arrIsDisabledFilters ? arrIsDisabledFilters[item] : false,
  }));
};

export const getSelectOption = (value: string | number | null, i18Path: string) => {
  if (typeof value === 'string') {
    return value
      ? { value, label: i18next.exists(`${i18Path}.${value}`) ? i18next.t(`${i18Path}.${value}`) : value }
      : null;
  }
  if (typeof value === 'number') {
    return { value: value.toString(), label: value.toString() };
  }
  return null;
};

export const getSelectOptionValue = (value: string | number, i18Path: string) => {
  if (typeof value === 'number') {
    return value.toString();
  }

  return i18next.exists(`${i18Path}.${value}`) ? i18next.t(`${i18Path}.${value}`) : value;
};
