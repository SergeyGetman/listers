import React, { FC, useCallback, useState } from 'react';
import { Box, Collapse, Fade, Typography } from '@mui/material';

import {
  BaseMobileAccordion,
  BaseMobileAccordionDetails,
  BaseMobileAccordionDetailsBackground,
  BaseMobileAccordionSummary,
  BaseMobileAccordionSummaryContainer,
} from './MuBaseMobileAccordion.style';
import BaseActionMenu from '../../actionMenus/BaseActionMenu';
import { ActionMenuListModel } from '../../../shared/models/actionMenuList.model';

type MuiBaseMobileAccordionProps = {
  title?: string;
  children?: React.ReactNode;
  headerComponent?: React.ReactNode;
  subtitleComponent?: React.ReactNode;
  subtitleText?: string;
  titleWhiteSpace?: string;
  isDefaultExpand?: boolean;
  isDisabledExpand?: boolean;
  isEdit?: boolean;
  isDefaultHeaderPadding?: boolean;
  isCustomHeader?: boolean;
  isBlurred?: boolean;
  menuList?: ActionMenuListModel;
  rightChildren?: React.ReactNode;
  onToggleOpen?: (isOpen: boolean) => void;
};

const MuiBaseMobileAccordion: FC<MuiBaseMobileAccordionProps> = ({
  isDisabledExpand = false,
  titleWhiteSpace = 'nowrap',
  isDefaultExpand = false,
  isDefaultHeaderPadding = true,
  children,
  subtitleComponent,
  subtitleText,
  isBlurred,
  isEdit = true,
  isCustomHeader = false,
  headerComponent,
  menuList,
  title,
  onToggleOpen,
  rightChildren,
}) => {
  const [isExpanded, toggleExpand] = useState<boolean>(isDefaultExpand);

  const onToggleExpand = useCallback(() => {
    toggleExpand(!isExpanded);
    onToggleOpen?.(!isExpanded);
  }, [isExpanded, onToggleOpen]);

  return (
    <BaseMobileAccordion
      isBlurred={isBlurred && !isExpanded}
      disableGutters
      elevation={0}
      square
      expanded={isDisabledExpand ? isDefaultExpand : isExpanded}
      onChange={isDisabledExpand ? () => null : onToggleExpand}
    >
      <BaseMobileAccordionSummary isDefaultHeaderPadding={isDefaultHeaderPadding} isExpanded={isExpanded}>
        {isCustomHeader ? (
          headerComponent
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <BaseMobileAccordionSummaryContainer sx={{ maxWidth: rightChildren ? '60%' : 'auto' }}>
              <Box
                sx={{
                  whiteSpace: titleWhiteSpace,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                }}
              >
                <Typography sx={{ lineHeight: '23px' }} variant="extra_large_bolt">
                  {title}
                </Typography>
              </Box>

              <Collapse in={!isExpanded} unmountOnExit sx={{ width: '100%' }}>
                {subtitleText ? (
                  <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {subtitleText}
                  </Typography>
                ) : (
                  <Box>{subtitleComponent}</Box>
                )}
              </Collapse>
            </BaseMobileAccordionSummaryContainer>

            {isEdit && menuList ? (
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {rightChildren ? rightChildren : null}
                <BaseActionMenu menuList={menuList} />
              </Box>
            ) : rightChildren ? (
              rightChildren
            ) : null}
          </Box>
        )}
      </BaseMobileAccordionSummary>
      <BaseMobileAccordionDetails>
        <Fade in={isExpanded} unmountOnExit>
          <BaseMobileAccordionDetailsBackground />
        </Fade>

        {children}
      </BaseMobileAccordionDetails>
    </BaseMobileAccordion>
  );
};

export default MuiBaseMobileAccordion;
