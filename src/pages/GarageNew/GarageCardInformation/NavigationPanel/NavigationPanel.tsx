import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import MuiAvatar from '../../../../components/avatars/MuiAvatart/MuiAvatar';
import { ChipUI } from '../../../../compositeComponents/Chip/ChipUI';
import ProgressBarWithLabel from '../../../../components/ProgressBarWithLabel';
import { ReactComponent as CardIcon } from '../../../../assets/Images/chip/Car.svg';
import { ReactComponent as CalendarIcon } from '../../../../assets/Images/chip/Calendar.svg';
import { ReactComponent as OpenEyeIcon } from '../../../../assets/Images/chip/Open eye.svg';
import { ReactComponent as LicensePlateIcon } from '../../../../assets/Images/chip/License Plate.svg';
import { RootGarageItemsData } from '../../store/types';
import { capitalizeFirstLetter } from '../../../../shared/utils/capitalizeFirstLetter';

type PropsType = {
  transport: Pick<
    RootGarageItemsData,
    'transport_type' | 'license_plate' | 'interior_color' | 'year' | 'cover_photo' | 'make' | 'model'
  >;
};

const NavigationPanel = ({ transport }: PropsType) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const avatarSrc = !transport.cover_photo
    ? ''
    : transport.cover_photo[0].additional_info.size_urls.gallery || transport.cover_photo[0].url;
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems={isMobile ? 'flex-start' : 'center'}
      flexDirection={isMobile ? 'column' : 'row'}
      gap={isMobile ? '4px' : '0'}
    >
      <Box display="flex" gap="16px">
        <MuiAvatar
          firstName={transport.make}
          lastName={transport.model}
          src={avatarSrc}
          id={0}
          size="extraMediumV2"
        />

        <Box display="flex" flexDirection="column" gap="4px">
          <Typography variant={isMobile ? 'h3' : 'h2'} sx={{ color: theme.palette.case.neutral.n900 }}>
            {transport.make} - {transport.model}
          </Typography>
          <Box display="flex" gap="8px" flexWrap="wrap" maxWidth={isMobile ? '210px' : 'initial'}>
            <ChipUI
              label={transport.transport_type ? capitalizeFirstLetter(transport.transport_type) : ''}
              icon={<CardIcon />}
            />
            <ChipUI label={transport.year ? String(transport.year) : ''} icon={<CalendarIcon />} />
            <ChipUI
              label={transport.interior_color ? capitalizeFirstLetter(transport.interior_color) : ''}
              icon={<OpenEyeIcon />}
            />
            <ChipUI label={transport.license_plate} icon={<LicensePlateIcon />} />
          </Box>
        </Box>
      </Box>
      <Box width={isMobile ? '100%' : '200px'}>
        <ProgressBarWithLabel hintText={t('general.completeRate')} value={15} />
      </Box>
    </Box>
  );
};
export default memo(NavigationPanel);
