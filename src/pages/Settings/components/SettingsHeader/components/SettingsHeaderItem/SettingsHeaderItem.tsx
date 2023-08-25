import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import {
  SettingsHeaderItemContainer,
  SettingsHeaderItemFlexContainer,
  SettingsHeaderItemIconContainer,
} from './SettingsHeaderItem.style';
import MuiTooltip from '../../../../../../components/MuiTooltip';
import MuiLinkButton from '../../../../../../components/buttons/MuiLinkButton';

type SettingsHeaderItemProps = {
  to: string;
  children: React.ReactNode;
  label: string;
  isLogout?: boolean;
  isComing?: boolean;
  handleLogout: () => void;
  isActivatedHub?: boolean;
  isHub?: boolean;
};
const SettingsHeaderItem: FC<SettingsHeaderItemProps> = ({
  to,
  handleLogout,
  children,
  isLogout,
  label,
  isComing,
  isActivatedHub,
  isHub,
}) => {
  const resolved = useResolvedPath(to);
  const theme = useTheme();
  const isMatch = useMatch({ path: resolved.pathname, end: true });
  const { t } = useTranslation();
  const isDisabled = useMemo(() => {
    return isComing || (!isActivatedHub && isHub);
  }, [isComing, isActivatedHub, isHub]);
  return isDisabled ? (
    <SettingsHeaderItemContainer>
      <SettingsHeaderItemFlexContainer>
        <MuiTooltip
          placement="bottom"
          isShowOnMobile
          title={isHub ? t('general.tooltips.activateHubs') : t('general.tooltips.comingSoon')}
        >
          <SettingsHeaderItemIconContainer isComing isMatch={isMatch}>
            {children}
          </SettingsHeaderItemIconContainer>
        </MuiTooltip>
        <Typography
          sx={{
            textAlign: 'center',
            color: theme.palette.case.neutral.n400,
          }}
          variant="extra_small"
        >
          {label}
        </Typography>
      </SettingsHeaderItemFlexContainer>
    </SettingsHeaderItemContainer>
  ) : (
    <SettingsHeaderItemContainer>
      <SettingsHeaderItemFlexContainer>
        {isLogout ? (
          <Box sx={{ cursor: 'pointer' }} onClick={handleLogout}>
            <SettingsHeaderItemIconContainer isMatch={isMatch}>{children}</SettingsHeaderItemIconContainer>
          </Box>
        ) : (
          <MuiLinkButton>
            <Link to={to}>
              <SettingsHeaderItemIconContainer isMatch={isMatch}>{children}</SettingsHeaderItemIconContainer>
            </Link>
          </MuiLinkButton>
        )}

        <Typography sx={{ textAlign: 'center' }} variant="extra_small">
          {label}
        </Typography>
      </SettingsHeaderItemFlexContainer>
    </SettingsHeaderItemContainer>
  );
};

export default SettingsHeaderItem;
