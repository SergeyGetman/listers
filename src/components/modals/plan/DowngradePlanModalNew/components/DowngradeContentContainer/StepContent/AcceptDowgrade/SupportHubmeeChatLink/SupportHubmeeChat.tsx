import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../../../../../../../shared/hooks/redux';
import { setLoading } from '../../../../../../../../../store/Common/commonSlice';
import { getSupportThread } from '../../../../../../../../../store/chat/chatThunk';

type PropsType = {
  onClose: () => void;
};

export const SupportHubmeeChat: FC<PropsType> = ({ onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const openSupportChat = () => {
    dispatch(setLoading(true));
    dispatch(getSupportThread())
      .then(async (result) => {
        if (getSupportThread.fulfilled.match(result)) {
          await onClose?.();
          navigate(`/chat/personal/${result.payload.id}`);
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  return (
    <Box
      position="absolute"
      sx={{
        width: isMobile ? '100%' : 'initial',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        left: isMobile ? '0' : '24px',
        bottom: isMobile ? '90px' : ' 30px',
      }}
    >
      <Typography component="span" variant="t12r">
        {t('plans.downgrade.discountOffer.content.feelFree')}
        <Typography
          component="span"
          onClick={openSupportChat}
          mx="4px"
          variant="t12r"
          sx={{
            color: theme.palette.case.blue.b600,
            cursor: 'pointer',
            borderBottom: `1px solid ${theme.palette.case.blue.b600}`,
          }}
        >
          {t('plans.downgrade.discountOffer.content.contactUs')}
        </Typography>
        {t('plans.downgrade.discountOffer.content.questions')}
      </Typography>
    </Box>
  );
};
