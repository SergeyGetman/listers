import React, { FC, memo } from 'react';
import { Box, Typography, useTheme, Zoom } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import NavigationButton from '../../../../../buttons/NavigationButton';
import BaseActionMenu from '../../../../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../../../../shared/models/actionMenuList.model';
import MuiIconButton from '../../../../../buttons/MuiIconButton';
import {
  MuiDefaultDrawerHeaderAfterTitleIconContainer,
  MuiDefaultDrawerHeaderContainer,
  MuiDefaultDrawerHeaderEditModeContainer,
  MuiDefaultDrawerHeaderEditModeMobileContainer,
  MuiDefaultDrawerHeaderSubtitleText,
  MuiDefaultDrawerHeaderTitle,
  MuiDefaultDrawerHeaderTitleContainer,
  MuiDefaultDrawerHeaderTitleText,
} from './MuiDefaultDrawerHeader.style';
import MuiTooltip from '../../../../../MuiTooltip';
import { ReactComponent as CrownGold } from '../../../../../../assets/Images/crown-gold.svg';
import { ReactComponent as CrownPlatinum } from '../../../../../../assets/Images/crown-platinum.svg';

type MuiDefaultDrawerHeaderProps = {
  onClose: () => void;
  title: string;
  subtitle?: string;
  isShowCloseBtn?: boolean;
  isEditMode?: boolean;
  titleRightIcon?: any;
  afterTitleIconCallback?: () => void;
  afterTitleIcon?: any;
  headerMenuList?: ActionMenuListModel;
  isShowHeaderMenu?: boolean;
  isRoundCloseButton?: boolean;
  isShowUpgradePackagesBtn?: boolean;
  isUpgradeToGold?: boolean;
  handleClickUpgradePackage?: () => void;
};

const MuiDefaultDrawerHeader: FC<MuiDefaultDrawerHeaderProps> = ({
  title,
  subtitle,
  onClose,
  isShowCloseBtn = true,
  titleRightIcon,
  isShowHeaderMenu,
  headerMenuList,
  afterTitleIcon,
  afterTitleIconCallback,
  isEditMode = false,
  isRoundCloseButton = false,
  isUpgradeToGold = true,
  isShowUpgradePackagesBtn,
  handleClickUpgradePackage,
}) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const isSmallDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isSmallDisplay && isEditMode && (
        <MuiDefaultDrawerHeaderEditModeMobileContainer>
          <Typography
            sx={{
              textTransform: 'uppercase',
              color: theme.palette.error.main,
            }}
            variant="small"
          >
            {t('general.header.editMode')}
          </Typography>
        </MuiDefaultDrawerHeaderEditModeMobileContainer>
      )}
      <MuiDefaultDrawerHeaderContainer isEditMode={isEditMode}>
        {isShowCloseBtn && (
          <Box>
            <NavigationButton onClick={() => onClose()} size="large" type="back" />
          </Box>
        )}
        {isRoundCloseButton && (
          <Box sx={{ position: 'absolute', right: '16px' }}>
            <NavigationButton background="initial" size="large" type="close" onClick={onClose} />
          </Box>
        )}

        <MuiDefaultDrawerHeaderTitleContainer isShowCloseBtn={isShowCloseBtn}>
          <MuiDefaultDrawerHeaderTitle isShowCloseBtn={isShowCloseBtn}>
            <MuiDefaultDrawerHeaderTitleText sx={{ color: theme.palette.case.neutral.n700 }} variant="h3">
              {title}{' '}
              {subtitle && (
                <MuiDefaultDrawerHeaderSubtitleText variant="extra_small">
                  {subtitle}
                </MuiDefaultDrawerHeaderSubtitleText>
              )}
              {afterTitleIcon && (
                <MuiIconButton size="small" onClick={afterTitleIconCallback}>
                  <MuiDefaultDrawerHeaderAfterTitleIconContainer>
                    {afterTitleIcon}
                  </MuiDefaultDrawerHeaderAfterTitleIconContainer>
                </MuiIconButton>
              )}
            </MuiDefaultDrawerHeaderTitleText>

            {titleRightIcon && (
              <Box sx={{ svg: { width: '24px', height: '24px' }, ml: '5px' }}>{titleRightIcon}</Box>
            )}
          </MuiDefaultDrawerHeaderTitle>
          <Box sx={{ height: '43px', width: '43px' }}>
            <Zoom in={!!isShowHeaderMenu && !!headerMenuList}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BaseActionMenu iconSize="large" menuList={headerMenuList || []} />
              </Box>
            </Zoom>
          </Box>
        </MuiDefaultDrawerHeaderTitleContainer>

        {isEditMode && !isSmallDisplay && (
          <MuiDefaultDrawerHeaderEditModeContainer>
            <Typography
              sx={{
                textTransform: 'capitalize',
                color: theme.palette.case.warning.high,
              }}
              variant="small"
            >
              {t('general.header.editMode')}
            </Typography>
          </MuiDefaultDrawerHeaderEditModeContainer>
        )}

        {isShowUpgradePackagesBtn ? (
          <MuiTooltip color="dark" title="Upgrade">
            <Box
              onClick={() => (handleClickUpgradePackage ? handleClickUpgradePackage() : false)}
              sx={{
                mr: '14px',
                cursor: 'pointer',
                svg: {
                  width: '24px',
                  height: '24px',
                },
              }}
            >
              {isUpgradeToGold ? <CrownGold /> : <CrownPlatinum />}
            </Box>
          </MuiTooltip>
        ) : (
          <></>
        )}
      </MuiDefaultDrawerHeaderContainer>
    </>
  );
};

export default memo(MuiDefaultDrawerHeader);
