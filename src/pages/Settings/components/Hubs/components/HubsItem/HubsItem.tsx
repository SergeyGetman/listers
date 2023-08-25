import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import {
  HubIconContainer,
  HubsDescriptionContainer,
  HubsItemContainer,
  HubsItemContent,
  HubsItemFooter,
  HubsItemHeader,
} from './HubsItem.style';

import { HubsInfoModalProps } from '../../Hubs';
import { HubsEnum } from '../../../../../../shared/enums/hubs.enum';
import BottomCardButton from '../../../../../../components/buttons/BottomCardButton';
import MuiTooltip from '../../../../../../components/MuiTooltip';

export type HubsItemProps = {
  handleActivateHub: (hubId: number) => void;
  handleDeactivateHub: (hubId: number) => void;
  handleOpenHubsInfoModal: ({
    hubId,
    isActivated,
    hubName,
    hubHeader,
    expired_at,
    is_in_package,
  }: HubsInfoModalProps) => void;
  children: React.ReactNode;
  label: string;
  isComing?: boolean;
  description: string;
  color: string;
  hoverBtnColor?: string;
  is_can_apply?: boolean;
  hubsName: HubsEnum;
  [key: string]: any;
};

const HubsItem: FC<HubsItemProps> = ({
  handleActivateHub,
  handleDeactivateHub,
  handleOpenHubsInfoModal,
  is_can_apply,
  hubsName,
  description,
  children,
  color,
  hoverBtnColor,
  isComing,
  label,
  ...args
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const handleActivate = () => {
    handleActivateHub(args.id);
  };

  const handleDeactivate = () => {
    handleDeactivateHub(args.id);
  };

  const handleItemClick = () => {
    handleOpenHubsInfoModal({
      hubId: args.id,
      isActivated: (args?.canceled_at && args.expired_at) || (!args?.canceled_at && !args.expired_at),
      hubName: hubsName,
      hubHeader: label,
      is_in_package: false,
      expired_at: '',
    });
  };
  return (
    <HubsItemContainer isComing={isComing} onClick={() => (isComing ? true : handleItemClick())}>
      <HubsItemContent>
        <HubsItemHeader>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <HubIconContainer isComing={isComing} color={color}>
              {children}
            </HubIconContainer>
            <Typography
              sx={{ color: isComing ? theme.palette.case.neutral.n500 : theme.palette.case.contrast.black }}
              variant="h3"
            >
              {label}
            </Typography>
          </Box>
        </HubsItemHeader>
        <HubsDescriptionContainer>
          <Typography
            sx={{
              color: isComing ? theme.palette.case.neutral.n500 : theme.palette.case.contrast.black,
            }}
            variant="default"
          >
            {description}
          </Typography>
        </HubsDescriptionContainer>
      </HubsItemContent>

      <HubsItemFooter>
        {args?.is_can_pin && is_can_apply && !isComing ? (
          <BottomCardButton onClick={handleActivate} variant="contained" label={t('general.buttons.pin')} />
        ) : isComing ? (
          <BottomCardButton
            isDisabled
            onClick={handleActivate}
            variant="contained"
            label={t('general.buttons.comingSoon')}
          />
        ) : !is_can_apply ? (
          <MuiTooltip color="dark" title={t('general.tooltips.pinnedByDefaultHub')}>
            <Box
              sx={{ width: '100%' }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <BottomCardButton isDisabled variant="contained" label={t('general.buttons.unpin')} />
            </Box>
          </MuiTooltip>
        ) : (
          <BottomCardButton
            onClick={handleDeactivate}
            variant="contained"
            label={t('general.buttons.unpin')}
          />
        )}
      </HubsItemFooter>
    </HubsItemContainer>
  );
};

export default HubsItem;
