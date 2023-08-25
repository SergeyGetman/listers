import React, { FC, useCallback, useState } from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { BaseAccordion, BaseAccordionDetails, BaseAccordionSummary } from './MuiBaseAccordion.style';

import InfoBtn from '../../buttons/InfoBtn';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';

type MuiDotAccordionProps = {
  label?: string;
  children?: React.ReactNode;
  isDefaultExpand?: boolean;
  isDisabledExpand?: boolean;
  isShowInfoDialog?: boolean;
  withHover?: boolean;
  infoTooltipText?: string;
  isShowMenu?: boolean;
  isBoxShadow?: boolean;
  menuList?: {
    label: string;
    callback: () => any;
    disableCallback?: () => any;
    isDisabled?: boolean;
    tooltipTitle?: string;
  }[];
};

const MuiBaseAccordion: FC<MuiDotAccordionProps> = ({
  label,
  children,
  infoTooltipText = 'Help',
  isDefaultExpand = true,
  isDisabledExpand = false,
  isShowInfoDialog = true,
  withHover = false,
  isBoxShadow = false,
  isShowMenu = true,
  menuList,
}) => {
  const [isExpanded, toggleExpand] = useState(isDefaultExpand);
  const onToggleExpand = useCallback(() => {
    toggleExpand(!isExpanded);
  }, [isExpanded]);

  return (
    <BaseAccordion
      withHover={withHover}
      disableGutters
      elevation={0}
      square
      expanded={isDisabledExpand ? true : isExpanded}
      onChange={isDisabledExpand ? () => null : onToggleExpand}
    >
      <BaseAccordionSummary isBoxShadow={isBoxShadow} isDisabledExpand={isDisabledExpand}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isDisabledExpand && (
            <Box
              sx={{
                width: '20px',
                height: '20px',
                marginRight: '5px',
              }}
            >
              <KeyboardArrowDownIcon
                sx={{ transform: isExpanded ? 'rotate(180deg)' : '', transition: '0.3s' }}
              />
            </Box>
          )}

          <Typography sx={{ marginRight: '5px' }} variant="large_bolt">
            {label}
          </Typography>
          {isShowInfoDialog && false && <InfoBtn infoTooltipText={infoTooltipText} />}
        </Box>
        {isShowMenu && menuList && (
          <Box>
            <BaseActionMenu menuList={menuList} />
          </Box>
        )}
      </BaseAccordionSummary>
      <BaseAccordionDetails withHover={withHover}>{children}</BaseAccordionDetails>
    </BaseAccordion>
  );
};

export default MuiBaseAccordion;
