import React, { FC, memo, useState } from 'react';
import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material';
import parse from 'html-react-parser';
import { useTranslation } from 'react-i18next';
import MuiButton from '../../buttons/MuiButton';
import { ReactComponent as SelectArrowTop } from '../../../assets/Images/select-green-top.svg';
import { ReactComponent as SelectArrowDown } from '../../../assets/Images/select-green-down.svg';

type ViewDescriptionContainerProps = {
  description: string;
  label?: string;
  isShowLabel?: boolean;
  sx?: SxProps<Theme>;
  showMoreButton?: boolean;
  maxHeight?: string;
  maxCharacters?: number;
};

const ViewDescriptionContainer: FC<ViewDescriptionContainerProps> = ({
  description,
  label,
  isShowLabel = true,
  sx,
  showMoreButton = false,
  maxHeight = '300px',
  maxCharacters = 490,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [showFullContent, setShowFullContent] = useState(false);

  const handleToggleContent = () => setShowFullContent(!showFullContent);

  return (
    <Box>
      {isShowLabel && (
        <Typography mb="16px" variant="h3" color={theme.palette.case.neutral.n800}>
          {label ? label : t('general.containers.description')}
        </Typography>
      )}
      <Box
        // TODO add general reset
        sx={{
          maxHeight: showFullContent ? 'none' : maxHeight,
          overflow: showFullContent ? 'visible' : showMoreButton ? 'hidden' : 'auto',
          overflowX: 'hidden',
          wordBreak: 'break-word',

          '& p': {
            marginLeft: '0',
            marginTop: '0',
            mb: '0px',
            width: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            fontFamily: 'Archivo !important',
          },
          '& ol': { marginLeft: '0', marginTop: '0', pl: '16px' },
          '& pre': { marginLeft: '0', marginTop: '0' },
          '& a': { color: theme.palette.case.main.blue.high, '&:hover': { opacity: '0.7' } },
          '& span': {
            backgroundColor: 'transparent !important',
            color: `${theme.palette.case.neutral.n700} !important`,
            fontSize: `${theme.typography.default.fontSize} !important`,
            fontFamily: 'Archivo !important',
          },
          '& h2': {
            backgroundColor: 'transparent !important',
            color: `${theme.palette.case.neutral.n900} !important`,
            fontSize: `${theme.typography.default.fontSize} !important`,
            fontFamily: 'Archivo !important',
          },
          ...sx,
        }}
      >
        <Typography variant="default"> {parse(description)}</Typography>
      </Box>
      {showMoreButton && description.length > maxCharacters && (
        <MuiButton
          sx={{
            '&.text-mui-button': {
              padding: '0 !important',
            },
          }}
          onClick={handleToggleContent}
          label={showFullContent ? t('general.buttons.showLess') : t('general.buttons.showMore')}
          variant="text"
          color="primary"
          size="small"
          endIcon={showFullContent ? <SelectArrowTop /> : <SelectArrowDown />}
        />
      )}
    </Box>
  );
};

export default memo(ViewDescriptionContainer);
