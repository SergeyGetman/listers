import React, { FC, useCallback } from 'react';
import { Box, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { GarageTransportPaymentModel } from '../../../../../shared/models/garage.model';

import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';
import { PlannerItemStatusesEnum } from '../../../../../shared/enums/plannerItemStatuses.enum';
import BaseActionMenu from '../../../../../components/actionMenus/BaseActionMenu';

type WalletDesktopItemHeaderProps = {
  item: GarageTransportPaymentModel;
  handleOpenPaymentModal: (id: number, isOpenEditMode: boolean) => void;
};

const WalletDesktopItemContent: FC<WalletDesktopItemHeaderProps> = ({ item, handleOpenPaymentModal }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getMenu = useCallback(
    (id: number) => {
      return [
        { label: 'View', callback: () => handleOpenPaymentModal(id, false) },
        { label: 'Edit', callback: () => handleOpenPaymentModal(id, true) },
      ];
    },
    [handleOpenPaymentModal],
  );

  return (
    <Grid rowSpacing="17px" container sx={{ p: '0 10px' }}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3} sm={2.4}>
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="default"
            >
              {t('wallet.payment.itemContent.title.paymentId')}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2.4}>
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="default"
            >
              {t('wallet.payment.itemContent.title.dueDate')}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2.4}>
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="default"
            >
              {t('wallet.payment.itemContent.title.amount')}
            </Typography>
          </Grid>
          <Grid item xs={3} sm={2.4}>
            <Typography
              sx={{
                color: theme.palette.case.neutral.n700,
              }}
              variant="default"
            >
              {t('wallet.payment.itemContent.title.status')}
            </Typography>
          </Grid>
          {!isMobile && <Grid item xs={3} sm={2.4} display="flex" justifyContent="center" />}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid rowSpacing="10px" container>
          {item.payments.map((el, index) => {
            const itemStatus =
              plannerItemStatusesConfig[el.is_global_late ? PlannerItemStatusesEnum.late : el.global_status];

            return (
              <Grid key={el.id} item xs={12}>
                <Grid
                  sx={{
                    borderBottom:
                      index === item.payments.length - 1
                        ? 'none'
                        : `1px dashed ${theme.palette.case.neutral.n400}`,
                    p: '10px 0',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleOpenPaymentModal(el.id, false)}
                  key={index}
                  container
                >
                  <Grid xs={3} sm={2.4} item>
                    <Typography variant="default">{el.id}</Typography>
                  </Grid>
                  <Grid xs={3} sm={2.4} item>
                    <Typography variant="default">{moment(el.due_dated_at).format('MM/DD/YYYY')}</Typography>
                  </Grid>
                  <Grid xs={3} sm={2.4} item>
                    <Typography variant="default">$ {el.amount / 100}</Typography>
                  </Grid>
                  <Grid xs={3} sm={2.4} item>
                    <Box
                      sx={{
                        display: 'flex',
                      }}
                    >
                      <Box
                        sx={{
                          svg: {
                            width: '16px',
                            height: '16px',
                          },
                        }}
                      >
                        <itemStatus.icon />
                      </Box>
                      <Typography sx={{ ml: '5px' }} variant="default">
                        {itemStatus.label}
                      </Typography>
                    </Box>
                  </Grid>
                  {!isMobile && (
                    <Grid xs={3} sm={2.4} display="flex" justifyContent="center" item>
                      <BaseActionMenu menuList={getMenu(el.id)} />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WalletDesktopItemContent;
