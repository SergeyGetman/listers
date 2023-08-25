import { TFunction } from 'i18next';

import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';

import { ReactComponent as PetsIcon } from '../../../assets/Images/hubsIcons/pets.svg';
import { ReactComponent as EducationIcon } from '../../../assets/Images/hubsIcons/education.svg';

import { ReactComponent as WorkIcon } from '../../../assets/Images/hubsIcons/work.svg';
import { ReactComponent as HealthIcon } from '../../../assets/Images/onboarding/health.svg';
import { ReactComponent as PropertyIcon } from '../../../assets/Images/hubsIcons/property.svg';

import { ReactComponent as CrownSilverIcon } from '../../../assets/Images/сrown-silver-package.svg';
import { ReactComponent as CrownPlatinumIcon } from '../../../assets/Images/crown-platinum-package.svg';
import { ReactComponent as CrownGoldIcon } from '../../../assets/Images/сrown-gold-package.svg';

import { ReactComponent as ShareIcon } from '../../../assets/Images/actionsIcons/share.svg';
import { ReactComponent as InformationIcon } from '../../../assets/Images/actionsIcons/information.svg';
import { ReactComponent as GalleryIcon } from '../../../assets/Images/actionsIcons/gallery.svg';
import { ReactComponent as PaperIcon } from '../../../assets/Images/actionsIcons/paper.svg';
import { ReactComponent as FeedIcon } from '../../../assets/Images/feed-icon.svg';

import { ReactComponent as ContactsIcon } from '../../../assets/Images/actionsIcons/contacts.svg';
import { ReactComponent as AppearanceIcon } from '../../../assets/Images/actionsIcons/appearance.svg';
import { ReactComponent as BodyArtIcon } from '../../../assets/Images/actionsIcons/bodyArt.svg';

import { PlansTableOrganizerItemsComingSoonType, PlansTableOrganizerItemsType } from './organizerItem.config';

export const getPlansTableHubsItemsConfig = (
  t: TFunction,
): PlansTableOrganizerItemsType[][] | any | PlansTableOrganizerItemsComingSoonType[] => [
  [
    {
      title: t('silver'),
      icon: <CrownSilverIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ShareIcon />, text: t('table.description.share') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ShareIcon />, text: t('table.description.share') },
        { icon: <PaperIcon />, text: t('table.description.registrations') },
        { icon: <GppGoodOutlinedIcon />, text: t('table.description.vehicleInsurance') },
        { icon: <FeedIcon />, text: t('table.description.notifyButton') },
      ],
    },
  ],
  [
    {
      title: t('silver'),
      icon: <CrownSilverIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ContactsIcon />, text: t('table.description.contacts') },
        { icon: <AppearanceIcon />, text: t('table.description.appearance') },
        { icon: <BodyArtIcon />, text: t('table.description.bodyArt') },
      ],
    },
    {
      title: t('gold'),
      icon: <CrownGoldIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ContactsIcon />, text: t('table.description.contacts') },
        { icon: <AppearanceIcon />, text: t('table.description.appearance') },
        { icon: <BodyArtIcon />, text: t('table.description.bodyArt') },
      ],
    },
    {
      title: t('platinum'),
      icon: <CrownPlatinumIcon />,
      listItems: [
        { icon: <InformationIcon />, text: t('table.description.generalInformation') },
        { icon: <GalleryIcon />, text: t('table.description.gallery') },
        { icon: <ContactsIcon />, text: t('table.description.contacts') },
        { icon: <AppearanceIcon />, text: t('table.description.appearance') },
        { icon: <BodyArtIcon />, text: t('table.description.bodyArt') },
      ],
    },
  ],
  {
    title: t('table.leftColumnItems.pets'),
    isComingSoon: true,
    icon: <PetsIcon />,
    description: t('table.comingSoon.description'),
  },
  {
    title: t('table.leftColumnItems.education'),
    isComingSoon: true,
    icon: <EducationIcon />,
    description: t('table.comingSoon.description'),
  },
  {
    title: t('table.leftColumnItems.work'),
    isComingSoon: true,
    icon: <WorkIcon />,
    description: t('table.comingSoon.description'),
  },
  {
    title: t('table.leftColumnItems.health'),
    isComingSoon: true,
    icon: <HealthIcon />,
    description: t('table.comingSoon.description'),
  },
  {
    title: t('table.leftColumnItems.property'),
    isComingSoon: true,
    icon: <PropertyIcon />,
    description: t('table.comingSoon.description'),
  },
];
