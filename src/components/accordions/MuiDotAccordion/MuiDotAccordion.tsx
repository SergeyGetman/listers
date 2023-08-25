import React, { FC, memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import { AccordionDetails, Box, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { DotAccordion, DotAccordionSummary } from './MuiDotAccordion.style';
import MuiIconButton from '../../buttons/MuiIconButton';
import MuiTooltip from '../../MuiTooltip';
import InfoBtn from '../../buttons/InfoBtn';
import MuiCheckbox from '../../formElements/MuiCheckbox';
import { ReactComponent as CrownPlatinum } from '../../../assets/Images/crown-platinum.svg';
import { ReactComponent as CrownGold } from '../../../assets/Images/crown-gold.svg';

type MuiDotAccordionProps = {
  label?: string;
  children?: React.ReactNode;
  contentInformation?: string;
  contentCounter?: number;
  isShowDeleteBlockBtn?: boolean;
  isDefaultExpand?: boolean;
  isDisabledExpand?: boolean;
  handleDeleteBlock?: () => void;
  isShowInfoDialog?: boolean;
  isShowPlatinumCrownIcon?: boolean;
  isShowGoldCrownIcon?: boolean;
  infoTooltipText?: string;
  isShowCheckbox?: boolean;
  checkboxLabel?: string;
  checkboxName?: string;
  control?: Control<any>;
  subLabel?: string;
  isCustomExpandState?: boolean;
  isCustomExpand?: boolean;
  setCustomExpand?: (val: boolean) => void;
  isShowAccordionSummery?: boolean;
  isDisabledAccordionDetails?: boolean;
  accordionDetailsTooltipText?: string;
  handleClickAccordionDetails?: () => void;
};

const MuiDotAccordion: FC<MuiDotAccordionProps> = ({
  label,
  children,
  contentInformation,
  contentCounter = 0,
  isShowDeleteBlockBtn,
  isDefaultExpand = true,
  isDisabledExpand,
  isShowInfoDialog,
  isShowPlatinumCrownIcon,
  isShowGoldCrownIcon,
  infoTooltipText,
  handleDeleteBlock,
  isShowAccordionSummery = true,
  control,
  isShowCheckbox,
  checkboxLabel = '',
  checkboxName = '',
  isCustomExpandState,
  isCustomExpand,
  setCustomExpand,
  isDisabledAccordionDetails,
  accordionDetailsTooltipText = '',
  handleClickAccordionDetails,
  subLabel,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [isExpanded, toggleExpand] = useState(isDefaultExpand);

  const onToggleExpand = useCallback(() => {
    if (isCustomExpandState) {
      if (setCustomExpand) {
        setCustomExpand(!isCustomExpand);
      }
    } else {
      toggleExpand(!isExpanded);
    }
  }, [isExpanded, isCustomExpandState, setCustomExpand, isCustomExpand]);

  const onClickDeleteBlockBtn = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (handleDeleteBlock) {
        handleDeleteBlock();
      }
    },
    [handleDeleteBlock],
  );

  return (
    <DotAccordion
      disableGutters
      elevation={0}
      square
      expanded={isDisabledExpand ? true : isCustomExpandState ? isCustomExpand || false : isExpanded}
      onChange={isDisabledExpand ? () => null : onToggleExpand}
    >
      {isShowAccordionSummery ? (
        <DotAccordionSummary
          isDisabledExpand={isDisabledExpand}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', width: ' 100%' }}>
            {!isDisabledExpand && (
              <Box
                sx={{
                  width: '20px',
                  height: '20px',
                  marginRight: '5px',
                }}
              >
                <KeyboardArrowDownIcon
                  sx={{
                    transform: (isCustomExpandState ? isCustomExpand : isExpanded) ? 'rotate(180deg)' : '',
                    transition: '0.3s',
                  }}
                />
              </Box>
            )}

            <Typography noWrap sx={{ lineHeight: '16px', marginRight: '5px' }} variant="default_bolt">
              {label}
            </Typography>

            {isShowPlatinumCrownIcon && (
              //   TODO add upgrade plan modal
              <MuiTooltip color="dark" title="Upgrade">
                <Box
                  onClick={() => (handleClickAccordionDetails ? handleClickAccordionDetails() : false)}
                  sx={{ ml: '7px', cursor: 'pointer' }}
                >
                  <CrownPlatinum />
                </Box>
              </MuiTooltip>
            )}

            {isShowGoldCrownIcon && (
              //   TODO add upgrade plan modal
              <MuiTooltip color="dark" title="Upgrade">
                <Box
                  onClick={() => (handleClickAccordionDetails ? handleClickAccordionDetails() : false)}
                  sx={{ ml: '7px', cursor: 'pointer' }}
                >
                  <CrownGold />
                </Box>
              </MuiTooltip>
            )}
            {isShowInfoDialog && false && <InfoBtn infoTooltipText={infoTooltipText} />}
            {isShowCheckbox && (
              <Box onClick={(e: React.MouseEvent) => e.stopPropagation()}>
                <Controller
                  name={checkboxName}
                  control={control}
                  render={({ field }) => <MuiCheckbox {...field} label={checkboxLabel} />}
                />
              </Box>
            )}
            {subLabel && (
              <Typography
                sx={{ lineHeight: '16px', color: theme.palette.case.neutral.n400 }}
                variant="default"
                noWrap
              >
                {subLabel}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Typography
              noWrap
              sx={{ color: theme.palette.case.neutral.n400, marginRight: '8px' }}
              variant="extra_small"
            >
              {contentInformation && (
                <>
                  {contentCounter >= 1 ? contentCounter : 'No'} {contentInformation}
                </>
              )}
            </Typography>

            {isShowDeleteBlockBtn && (
              <MuiTooltip title={t('general.tooltips.remove')}>
                <Box component="span">
                  <MuiIconButton onClick={onClickDeleteBlockBtn} size="small" color="secondary">
                    <DeleteForeverOutlinedIcon
                      sx={{ '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' } }}
                    />
                  </MuiIconButton>
                </Box>
              </MuiTooltip>
            )}
          </Box>
        </DotAccordionSummary>
      ) : null}
      {isDisabledAccordionDetails ? (
        <MuiTooltip color="dark" title={accordionDetailsTooltipText}>
          <AccordionDetails
            onClick={() => (handleClickAccordionDetails ? handleClickAccordionDetails() : false)}
            sx={{
              padding: isShowAccordionSummery ? '16px 0 0 0' : '0',
              cursor: 'pointer !important',
            }}
          >
            {children}
          </AccordionDetails>
        </MuiTooltip>
      ) : (
        <AccordionDetails
          sx={{
            padding: isShowAccordionSummery ? '16px 0 0 0' : '0',
          }}
        >
          {children}
        </AccordionDetails>
      )}
    </DotAccordion>
  );
};

export default memo(MuiDotAccordion);
