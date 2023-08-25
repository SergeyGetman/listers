/* eslint-disable react/no-unstable-nested-components */

import React, { FC, useState } from 'react';
import { Box, ClickAwayListener, useTheme } from '@mui/material';
import Linkify from 'react-linkify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import MuiIconButton from '../../buttons/MuiIconButton';
import {
  MuiBaseInputViewContainer,
  MuiBaseInputViewContentContainer,
  MuiBaseInputViewContentContainerText,
  MuiBaseInputViewLabel,
} from './MuiBaseInputView.style';
import MuiTooltip from '../../MuiTooltip';

type MuiBaseInputViewProps = {
  label: string;
  content: string | React.ReactNode;
  isLate?: boolean;
  noWrap?: boolean;
  isShowCopyBtn?: boolean;
  isShowLocationBtn?: boolean;
  isShowHideBlockBtn?: boolean;
  isShowBlock?: boolean;
  isOpenBlockTooltipText?: string;
  isHideBlockTooltipText?: string;
  isShowBottomBorder?: boolean;
  toggleShowBlock?: (value: boolean) => void;
  handleOpenInGoogleMaps?: () => void;
  isPassword?: boolean;
  isPhone?: boolean;
};

const MuiBaseInputView: FC<MuiBaseInputViewProps> = ({
  label,
  content,
  isLate,
  isShowCopyBtn,
  isShowBottomBorder = true,
  noWrap = true,
  isPhone = false,
  isPassword,
  handleOpenInGoogleMaps,
  isShowLocationBtn,
  isShowHideBlockBtn,
  isOpenBlockTooltipText = '',
  isHideBlockTooltipText = '',
  toggleShowBlock,
  isShowBlock,
}) => {
  const { t } = useTranslation();

  const STATUS_COPY = {
    COPY: t('general.statusCopy.copy'),
    COPIED: t('general.statusCopy.copied'),
  };
  const TITLE_BY_STATUS = {
    [STATUS_COPY.COPY]: t('general.statusCopy.titleByStatus.copy'),
    [STATUS_COPY.COPIED]: t('general.statusCopy.titleByStatus.copied'),
  };
  const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const theme = useTheme();
  const onClickCopy = () => {
    setStatusCopy(STATUS_COPY.COPIED);
  };
  const onClickAway = () => {
    setStatusCopy(STATUS_COPY.COPY);
  };
  // TODO Need add style for link
  return (
    <MuiBaseInputViewContainer isShowBottomBorder={isShowBottomBorder}>
      <MuiBaseInputViewLabel variant="label" isLate={isLate}>
        {label}
      </MuiBaseInputViewLabel>
      <MuiBaseInputViewContentContainer>
        <MuiBaseInputViewContentContainerText noWrap={noWrap} variant="default">
          {isPassword ? (
            hiddenPassword ? (
              '********'
            ) : (
              content
            )
          ) : isPhone ? (
            <a href={`tel:${content}`}>{content}</a>
          ) : (
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a onClick={(e) => e.stopPropagation()} target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}
            >
              {content}
            </Linkify>
          )}
        </MuiBaseInputViewContentContainerText>
        <Box sx={{ display: 'flex', align: 'center' }}>
          {isShowLocationBtn && (
            <MuiTooltip title={t('general.tooltips.openInGoogleMaps')}>
              <Box component="span" sx={{ marginRight: '7px' }}>
                <MuiIconButton
                  onClick={() => (handleOpenInGoogleMaps ? handleOpenInGoogleMaps() : true)}
                  color="primary"
                  size="small"
                >
                  <LocationOnIcon sx={{ '&: hover': { opacity: '0.7' } }} />
                </MuiIconButton>
              </Box>
            </MuiTooltip>
          )}
          {isShowCopyBtn && (
            <ClickAwayListener onClickAway={() => onClickAway()}>
              <Box>
                <MuiTooltip title={TITLE_BY_STATUS[statusCopy]}>
                  <Box component="span">
                    <CopyToClipboard text={typeof content === 'string' ? content : ''}>
                      <MuiIconButton onClick={() => onClickCopy()} color="primary" size="small">
                        <ContentCopyIcon sx={{ '&: hover': { opacity: '0.7' } }} />
                      </MuiIconButton>
                    </CopyToClipboard>
                  </Box>
                </MuiTooltip>
              </Box>
            </ClickAwayListener>
          )}

          {isShowHideBlockBtn && (
            <MuiTooltip title={isShowBlock ? isOpenBlockTooltipText : isHideBlockTooltipText}>
              <Box component="span" sx={{ marginLeft: '5px' }}>
                <MuiIconButton
                  onClick={() => (toggleShowBlock ? toggleShowBlock(!isShowBlock) : true)}
                  color="primary"
                  size="small"
                >
                  <KeyboardArrowDownIcon
                    sx={{
                      transform: isShowBlock ? 'rotate(180deg)' : '',
                      '&: hover': { opacity: '0.7' },
                      transition: '0.3s',
                    }}
                  />
                </MuiIconButton>
              </Box>
            </MuiTooltip>
          )}
          {isPassword && (
            <Box component="span" sx={{ ml: '5px' }}>
              {hiddenPassword ? (
                <MuiIconButton size="small" onClick={() => setHiddenPassword(!hiddenPassword)}>
                  <VisibilityOffIcon
                    sx={{
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&: hover': { opacity: '0.7' },
                    }}
                  />
                </MuiIconButton>
              ) : (
                <MuiIconButton size="small" onClick={() => setHiddenPassword(!hiddenPassword)}>
                  <VisibilityIcon
                    sx={{
                      color: theme.palette.primary.main,
                      cursor: 'pointer',
                      '&: hover': { opacity: '0.7' },
                    }}
                  />
                </MuiIconButton>
              )}
            </Box>
          )}
        </Box>
      </MuiBaseInputViewContentContainer>
    </MuiBaseInputViewContainer>
  );
};

export default MuiBaseInputView;
