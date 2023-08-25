import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { FC } from 'react';

import { useNavigate } from 'react-router';
import promocodeImg from '../../../../assets/Images/promocodeEvent.png';
import router from '../../../../shared/services/router';
import ModalFooter from '../../../modalsElements/containers/Footer/ModalFooter';
import MuiDefaultDrawerHeader from '../../../modalsElements/containers/MuiDrawer/MuiDrawersHeders/MuiDefaultDrawerHeader';

type Props = {
  onClose: () => void;
};

// TODO add locate
const EventModalContainer: FC<Props> = ({ onClose }) => {
  const navigate = useNavigate();
  const handleApplyPromo = () => {
    onClose();
    navigate(`${router.settings.path}/${router.settings.children.plans.path}?promo=lovelymee`);
  };
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        '& .modal-footer': {
          xs: {
            position: 'sticky',
          },
          sm: {
            position: 'initial',
          },
        },
        height: '100%',
      }}
      display="flex"
      flexDirection="column"
    >
      {match && (
        <MuiDefaultDrawerHeader
          isShowCloseBtn={false}
          isRoundCloseButton
          onClose={() => (onClose ? onClose() : true)}
          title="Valentine`s Day Special Offer"
        />
      )}

      <Box
        flexGrow={1}
        sx={{
          p: match ? '16px 10px' : '24px 36px',
        }}
      >
        {!match && (
          <Box mb="24px" textAlign="center">
            <Typography variant="h2">Valentine`s Day Special Offer</Typography>
          </Box>
        )}

        <Box sx={{ textAlign: 'center' }} width="90%" m="0 auto">
          <Typography
            variant="large"
            sx={{
              color: theme.palette.case.neutral.n700,
            }}
          >
            Valentine`s Day is coming and it’s a great opportunity to let you know that we fell in love with
            you. That’s why hubmee wants to give you a present!
          </Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box maxWidth={350} textAlign="center">
            <Box m="16px 0">
              <img src={promocodeImg} alt="promocodeImg" />
            </Box>
            <Box>
              <Typography
                sx={{
                  color: theme.palette.case.neutral.n900,
                }}
                variant="h3"
                component="span"
              >
                Use a promo code{' '}
                <Typography variant="h3" color="error" component="span">
                  lovelymee
                </Typography>{' '}
                and get -50% off for 1 month
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          m="16px 0"
          sx={{
            borderBottom: '1px solid #E6E8F0',
          }}
        />
        <Box
          textAlign="center"
          sx={{
            color: theme.palette.case.neutral.n700,
          }}
        >
          <Typography variant="default" component="span">
            Please note that this promo code is valid only until{' '}
            <Typography component="span" variant="default_bolt">
              02/14/2023
            </Typography>{' '}
            and applies to monthly plans.
          </Typography>
        </Box>
      </Box>
      <ModalFooter
        isShow
        rightBtnProps={{
          isStopPropagation: false,
          onClick: handleApplyPromo,
          isShow: true,
          label: 'Use Discount',
          variant: 'contained',
          type: 'submit',
        }}
      />
    </Box>
  );
};

export default EventModalContainer;
