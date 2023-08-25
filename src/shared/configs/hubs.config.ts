import { ReactComponent as GarageIcon } from '../../assets/Images/sidebar/garage.svg';
import { ReactComponent as ProfileIcon } from '../../assets/Images/sidebar/profile.svg';
import { ReactComponent as PetsIcon } from '../../assets/Images/hubsIcons/pets.svg';
import { ReactComponent as WorkIcon } from '../../assets/Images/hubsIcons/work.svg';
import { ReactComponent as EducationIcon } from '../../assets/Images/hubsIcons/education.svg';
import { ReactComponent as PropertyIcon } from '../../assets/Images/hubsIcons/property.svg';
import { HubsEnum } from '../enums/hubs.enum';
import i18next from '../locales/i18n';
import theme from '../../theme/theme';
export const hubsConfig = [
  {
    hubName: HubsEnum.profile,
    label: i18next.t('hubs.hubsInfo.profile.label'),
    icon: ProfileIcon,
    // TODO add color to theme
    color: '#07B6D5',
    isComing: false,
    description: i18next.t('hubs.hubsInfo.profile.description'),
  },
  {
    hubName: HubsEnum.garage,
    label: i18next.t('hubs.hubsInfo.garage.label'),
    icon: GarageIcon,
    // TODO add color to theme
    color: '#10B982',
    description: i18next.t('hubs.hubsInfo.garage.description'),
  },
  {
    hubName: HubsEnum.education,
    label: i18next.t('hubs.hubsInfo.education.label'),
    icon: EducationIcon,
    isComing: true,
    color: theme.palette.case.main.gey.high,
    description: i18next.t('hubs.hubsInfo.education.description'),
  },
  {
    hubName: HubsEnum.pets,
    label: i18next.t('hubs.hubsInfo.pets.label'),
    icon: PetsIcon,
    isComing: true,
    color: theme.palette.case.main.yellow.high,
    description: i18next.t('hubs.hubsInfo.pets.description'),
  },
  {
    hubName: HubsEnum.property,
    label: i18next.t('hubs.hubsInfo.property.label'),
    icon: PropertyIcon,
    isComing: true,
    color: theme.palette.case.main.blue.middle,
    description: i18next.t('hubs.hubsInfo.property.description'),
  },
  {
    hubName: HubsEnum.work,
    label: i18next.t('hubs.hubsInfo.work.label'),
    icon: WorkIcon,
    isComing: true,
    color: theme.palette.case.main.blue.middle,
    description: i18next.t('hubs.hubsInfo.work.description'),
  },
];
