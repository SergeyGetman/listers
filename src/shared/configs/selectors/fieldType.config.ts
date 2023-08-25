import i18next from 'i18next';
import { FieldsTypeEnum } from '../../enums/phoneType.enum';
import { SocialMediaEnum } from '../../enums/socialMedia.enum';

type FieldTypeConfigType = {
  [key: string]: {
    label: string;
    value: FieldsTypeEnum | SocialMediaEnum;
  };
};

export const FieldTypeConfig: FieldTypeConfigType = {
  [FieldsTypeEnum.home]: {
    value: FieldsTypeEnum.home,
    label: i18next.t('general.fieldType.home'),
  },
  [FieldsTypeEnum.work]: {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },
  [FieldsTypeEnum.main]: {
    label: i18next.t('general.fieldType.main'),
    value: FieldsTypeEnum.main,
  },
  [FieldsTypeEnum.other]: {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
  [FieldsTypeEnum.personal]: {
    label: i18next.t('general.fieldType.personal'),
    value: FieldsTypeEnum.personal,
  },
  [FieldsTypeEnum.school]: {
    label: i18next.t('general.fieldType.school'),
    value: FieldsTypeEnum.school,
  },
  [FieldsTypeEnum.homePage]: {
    label: i18next.t('general.fieldType.homePage'),
    value: FieldsTypeEnum.homePage,
  },
  [SocialMediaEnum.instagram]: {
    label: i18next.t('general.socialMedia.instagram'),
    value: SocialMediaEnum.instagram,
  },
  [SocialMediaEnum.facebook]: {
    label: i18next.t('general.socialMedia.facebook'),
    value: SocialMediaEnum.facebook,
  },
  [SocialMediaEnum.twitter]: {
    label: i18next.t('general.socialMedia.twitter'),
    value: SocialMediaEnum.twitter,
  },
  [SocialMediaEnum.googleTalk]: {
    label: i18next.t('general.socialMedia.googleTalk'),
    value: SocialMediaEnum.googleTalk,
  },
  [SocialMediaEnum.icq]: {
    label: i18next.t('general.socialMedia.icq'),
    value: SocialMediaEnum.icq,
  },
  [SocialMediaEnum.linkedIn]: {
    label: i18next.t('general.socialMedia.linkedIn'),
    value: SocialMediaEnum.linkedIn,
  },
};
