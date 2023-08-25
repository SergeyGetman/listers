import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MuiIconButton from '../../buttons/iconButtons/MuiIconButton';
import { InfoCardHeaderContainer } from './InfoCardHeader.style';
type InfoCardHeaderProps = {
  title: string;
  subTitle?: string;
  isShowBtn?: boolean;
  rightText?: string;
  callback?: () => void;
};
const InfoCardHeader: FC<InfoCardHeaderProps> = ({ title, subTitle, isShowBtn, rightText, callback }) => {
  const theme = useTheme();
  return (
    <InfoCardHeaderContainer subTitle={subTitle}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: theme.palette.case.neutral.n800 }} variant="h3">
          {title}
        </Typography>
        {subTitle ? (
          <Typography sx={{ mt: '2px', color: theme.palette.case.neutral.n400 }} variant="default">
            {subTitle}
          </Typography>
        ) : (
          <></>
        )}
      </Box>
      {isShowBtn ? (
        <Box>
          <MuiIconButton onClick={callback} variant="outlined" size="medium">
            <AddIcon />
          </MuiIconButton>
        </Box>
      ) : (
        <></>
      )}
      {rightText ? (
        <Box>
          <Typography sx={{ color: theme.palette.case.neutral.n700, fontWeight: '500' }} variant="subtitle1">
            {rightText}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
    </InfoCardHeaderContainer>
  );
};

export default InfoCardHeader;
