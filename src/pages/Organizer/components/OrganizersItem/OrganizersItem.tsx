import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { OrganizerItemType } from '../../../../shared/configs/organizer.config';
import { OrganizersEnum } from '../../../../shared/enums/organizers.enum';
import {
  OrganizersDescriptionContainer,
  OrganizersItemContainer,
  OrganizersItemFooter,
  OrganizersItemHeader,
  OrganizersItemIconContainer,
} from './OrganizersItem.style';
import BottomCardButton from '../../../../components/buttons/BottomCardButton';

type OrganizersItemType = {
  item: OrganizerItemType;
  handleOpenOrganizerInfoModal: (organizerType: OrganizersEnum) => void;
};

const OrganizersItem: FC<OrganizersItemType> = ({ item, handleOpenOrganizerInfoModal }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <OrganizersItemContainer
      isComing={item.isComing}
      onClick={() => (item.isComing ? true : handleOpenOrganizerInfoModal(item.type))}
    >
      <Box sx={{ padding: '0 16px' }}>
        <OrganizersItemHeader>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <OrganizersItemIconContainer isComing={item.isComing}>
              <item.icon />
            </OrganizersItemIconContainer>

            <Typography
              sx={{
                color: item.isComing ? theme.palette.case.neutral.n600 : theme.palette.case.neutral.n900,
              }}
              variant="h3"
            >
              {item.label}
            </Typography>
          </Box>
        </OrganizersItemHeader>
        <OrganizersDescriptionContainer>
          <Typography
            sx={{
              color: item.isComing ? theme.palette.case.neutral.n500 : theme.palette.case.neutral.n700,
            }}
            variant="default"
          >
            {item.description}
          </Typography>
        </OrganizersDescriptionContainer>
      </Box>
      <OrganizersItemFooter>
        <BottomCardButton
          variant="contained"
          onClick={() => handleOpenOrganizerInfoModal(item.type)}
          isDisabled={item.isComing}
          isActivated
          label={item.isComing ? t('general.buttons.comingSoon') : t('general.buttons.readMore')}
        />
      </OrganizersItemFooter>
    </OrganizersItemContainer>
  );
};

export default OrganizersItem;
