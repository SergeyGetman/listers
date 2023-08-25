import { ReactComponent as JournalIcon } from '../../../../assets/Images/newGarage/headerImageTooltip/JournalV2.svg';
import { ReactComponent as InsuranceIcon } from '../../../../assets/Images/newGarage/headerImageTooltip/Insurance.svg';
import { ReactComponent as GalleryIcon } from '../../../../assets/Images/newGarage/headerImageTooltip/Gallery.svg';
import { ReactComponent as ShareIcon } from '../../../../assets/Images/newGarage/action-menu/Family.svg';

export const getGarageTabs = (isMobile: boolean) => {
  return [
    {
      label: !isMobile ? 'General Information' : '',
      icon: <JournalIcon />,
    },
    {
      label: !isMobile ? 'Insurance' : '',
      icon: <InsuranceIcon />,
    },
    {
      label: !isMobile ? 'Gallery' : '',
      icon: <GalleryIcon />,
    },
    {
      label: !isMobile ? 'Sharing' : '',
      icon: <ShareIcon />,
    },
  ];
};
