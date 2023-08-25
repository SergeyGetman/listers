import i18next from 'i18next';
import InstagramIcon from '@mui/icons-material/Instagram';
import { GenderEnum } from '../../../../../shared/enums/gender.enum';
import { FieldsTypeEnum } from '../../../../../shared/enums/phoneType.enum';
import { SocialMediaEnum } from '../../../../../shared/enums/socialMedia.enum';
import { SelectOptionsModel } from '../../../../../shared/models/selectOptions.model';
import { ReactComponent as LinkedinIcon } from '../../../../../assets/Images/social-networks/linkedin-icon.svg';
import { ReactComponent as FacebookIcon } from '../../../../../assets/Images/social-networks/facebook-icon.svg';
import { ReactComponent as TwitterIcon } from '../../../../../assets/Images/social-networks/twitter-icon.svg';
import { ReactComponent as WebsiteIcon } from '../../../../../assets/Images/social-networks/website-icon.svg';

import { ReactComponent as MaleIcon } from '../../../../../assets/Images/genders/male-icon.svg';
import { ReactComponent as FemaleIcon } from '../../../../../assets/Images/genders/female-icon.svg';
import { ReactComponent as DontIdentifyIcon } from '../../../../../assets/Images/genders/dont-identify-icon.svg';
import { ReactComponent as NonBinaryIcon } from '../../../../../assets/Images/genders/non-binary-icon.svg';
import { ContactTypeEnum } from '../../../../../shared/enums/contactType.enum';

export const genderSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.gender.male'),
    value: GenderEnum.male,
    icon: MaleIcon,
  },
  {
    label: i18next.t('general.gender.female'),
    value: GenderEnum.female,
    icon: FemaleIcon,
  },
  {
    label: i18next.t('general.gender.unspecified'),
    value: GenderEnum.unspecified,
    icon: DontIdentifyIcon,
  },
  {
    label: i18next.t('general.gender.undisclosed'),
    value: GenderEnum.undisclosed,
    icon: NonBinaryIcon,
  },
];

export const phoneTypeSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldType.personal'),
    value: FieldsTypeEnum.personal,
  },
  {
    label: i18next.t('general.fieldType.home'),
    value: FieldsTypeEnum.home,
  },
  {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },

  {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
];
export const emailOrPhoneTypeSelectRightData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldType.personal'),
    value: FieldsTypeEnum.personal,
  },
  {
    label: i18next.t('general.fieldType.home'),
    value: FieldsTypeEnum.home,
  },
  {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },

  {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
];
export const emailOrPhoneTypeSelectLeftData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldNames.phone'),
    value: ContactTypeEnum.phone,
  },
  {
    label: i18next.t('general.fieldNames.email'),
    value: ContactTypeEnum.email,
  },
];

export const emailTypeSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldType.personal'),
    value: FieldsTypeEnum.personal,
  },
  {
    label: i18next.t('general.fieldType.home'),
    value: FieldsTypeEnum.home,
  },
  {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },
  {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
];

export const socialMediaSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.socialMedia.linkedIn'),
    value: SocialMediaEnum.linkedIn,
    icon: LinkedinIcon,
  },
  {
    label: i18next.t('general.socialMedia.facebook'),
    value: SocialMediaEnum.facebook,
    icon: FacebookIcon,
  },
  {
    label: i18next.t('general.socialMedia.instagram'),
    value: SocialMediaEnum.instagram,
    icon: InstagramIcon,
  },
  {
    label: i18next.t('general.socialMedia.twitter'),
    value: SocialMediaEnum.twitter,
    icon: TwitterIcon,
  },
  {
    label: i18next.t('general.socialMedia.website'),
    value: SocialMediaEnum.website,
    icon: WebsiteIcon,
  },
];

export const locationSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldType.home'),
    value: FieldsTypeEnum.home,
  },
  {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },
  {
    label: i18next.t('general.fieldType.school'),
    value: FieldsTypeEnum.school,
  },
  {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
];

export const urlSelectData: SelectOptionsModel = [
  {
    label: i18next.t('general.fieldType.homePage'),
    value: FieldsTypeEnum.homePage,
  },
  {
    label: i18next.t('general.fieldType.home'),
    value: FieldsTypeEnum.home,
  },
  {
    label: i18next.t('general.fieldType.work'),
    value: FieldsTypeEnum.work,
  },
  {
    label: i18next.t('general.fieldType.other'),
    value: FieldsTypeEnum.other,
  },
];
