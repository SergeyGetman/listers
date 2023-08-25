import i18next from 'i18next';

type SelectOptions = {
  label: string;
  value: string;
}[];

export const genderSelectData: SelectOptions = [
  {
    label: i18next.t('general.gender.male'),
    value: 'dwadwa',
  },
  {
    label: i18next.t('general.gender.female'),
    value: 'dwadwa',
  },
  {
    label: i18next.t('general.gender.unspecified'),
    value: 'dwadwa',
  },
  {
    label: i18next.t('general.gender.undisclosed'),
    value: 'dwadwa',
  },
];
