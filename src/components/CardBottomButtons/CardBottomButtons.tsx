import React, { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ButtonWrap } from './CardBottomButtons.style';
import BottomCardButton from '../buttons/BottomCardButton';

type Props = {
  handleDecline: () => void;
  handleAccept: () => void;
};

const CardBottomButtons: FC<Props> = ({ handleDecline, handleAccept }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      <ButtonWrap>
        <BottomCardButton
          variant="contained"
          onClick={handleDecline}
          isActivated
          textColor={theme.palette.case.red.r600}
          hoverTextColor={theme.palette.case.red.r800}
          label={t('general.buttons.decline')}
        />
      </ButtonWrap>
      <Box sx={{ width: '50%' }}>
        <BottomCardButton
          variant="contained"
          onClick={handleAccept}
          isActivated
          label={t('general.buttons.accept')}
        />
      </Box>
    </Box>
  );
};

export default CardBottomButtons;
