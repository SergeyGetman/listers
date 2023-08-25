import React, { FC, useState } from 'react';
import { Box, ClickAwayListener } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CopyIcon } from '../../../assets/Images/copy-icon.svg';
import MuiTooltip from '../../MuiTooltip';
type CopyButtonProps = {
  content: string | number;
};
const CopyButton: FC<CopyButtonProps> = ({ content }) => {
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
  const onClickCopy = () => {
    setStatusCopy(STATUS_COPY.COPIED);
  };
  const onClickAway = () => {
    setStatusCopy(STATUS_COPY.COPY);
  };
  return (
    <ClickAwayListener onClickAway={() => onClickAway()}>
      <Box height="16px">
        <MuiTooltip color="dark" title={TITLE_BY_STATUS[statusCopy]}>
          <Box component="span">
            <CopyToClipboard text={typeof content === 'string' ? content : ''}>
              <Box
                sx={{
                  '&: hover': { opacity: '0.7' },
                  cursor: 'pointer',
                  svg: { width: '16px', height: '16px' },
                }}
                onClick={() => onClickCopy()}
              >
                <CopyIcon />
              </Box>
            </CopyToClipboard>
          </Box>
        </MuiTooltip>
      </Box>
    </ClickAwayListener>
  );
};

export default CopyButton;
