import React, { FC, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Box, ClickAwayListener, Typography, useMediaQuery, useTheme } from '@mui/material';
import MuiTooltip from '../../../../../../../components/MuiTooltip';
import { ReactComponent as CopyClipboardIcon } from '../../../../../../../assets/Images/newGarage/create-item/CopyClipboard.svg';

type PropsTypeView = {
  isShowClipboard?: boolean;
  copyContent?: string | ReactNode;
  mainContent: {
    type: string;
    value: string | null;
  };
};

export const ViewVehicleTypeWithCopyClipboard: FC<PropsTypeView> = ({
  isShowClipboard = false,
  copyContent,
  mainContent,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const STATUS_COPY = {
    COPY: t('general.statusCopy.copy'),
    COPIED: t('general.statusCopy.copied'),
  };
  const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: t('general.statusCopy.titleByStatus.copy'),
    [STATUS_COPY.COPIED]: t('general.statusCopy.titleByStatus.copied'),
  };
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

  const onClickCopy = () => setStatusCopy(STATUS_COPY.COPIED);
  const onClickAway = () => setStatusCopy(STATUS_COPY.COPY);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: isTablet ? 'space-between' : 'initial',
        padding: '4px 16px',
        gap: '2px',
        [theme.breakpoints.up('lg')]: {
          justifyContent: 'space-between',
        },
      }}
    >
      <Typography
        sx={{
          display: 'inline-block',
          width: '100px',
          color: theme.palette.case.neutral.n500,
          flexShrink: 0,
        }}
        variant="t12r"
      >
        {mainContent.type}
      </Typography>

      <Box
        sx={{
          maxWidth: 'calc(100% - 100px)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          width: isTablet ? '136px' : 'initial',
          [theme.breakpoints.up('lg')]: {
            width: '136px',
          },
        }}
      >
        <Typography noWrap variant="t12r" sx={{ color: theme.palette.case.neutral.n800 }}>
          {mainContent.value ?? '—'}
        </Typography>
        {isShowClipboard && (
          <ClickAwayListener onClickAway={() => onClickAway()}>
            <Box>
              <MuiTooltip title={TITLE_BY_STATUS[statusCopy]}>
                <Box component="span" sx={{ cursor: 'pointer' }}>
                  <CopyToClipboard text={typeof copyContent === 'string' ? copyContent : ''}>
                    <CopyClipboardIcon
                      onClick={() => onClickCopy()}
                      style={{ '&: hover': { opacity: '0.7' } }}
                    />
                  </CopyToClipboard>
                </Box>
              </MuiTooltip>
            </Box>
          </ClickAwayListener>
        )}
      </Box>
    </Box>
  );
};
