import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import MuiBaseInputView from '../../../../../../../../components/formElements/MuiBaseInputView';
import MuiButton from '../../../../../../../../components/buttons/MuiButton';
import { WalletDesktopItemHeaderStatus } from './WalletDesktopItemHeader.style';
import { WalletItemModal } from '../../../../../../../../shared/models/wallet/walletItem.model';
import { walletItemStatusConfig } from '../../../../../../../../shared/configs/walletItemStatus.config';

type WalletDesktopItemHeaderProps = {
  item: WalletItemModal;
};

const WalletDesktopItemHeader: FC<WalletDesktopItemHeaderProps> = ({ item }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const status = walletItemStatusConfig[item.status];
  return (
    <Grid container>
      <Grid xs={12} sm={6} item sx={{ height: '70px', display: 'flex', alignItems: 'center' }}>
        <WalletDesktopItemHeaderStatus xs={12} sm={2} item>
          <status.icon />
        </WalletDesktopItemHeaderStatus>
        <Grid
          xs={12}
          sm={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '65px',
          }}
        >
          <Box
            sx={{
              width: '65px',
            }}
          >
            <MuiBaseInputView
              content={`${item.id}`}
              label={t('general.fieldNames.invoiceID')}
              isShowBottomBorder={false}
            />
          </Box>
        </Grid>
        <Grid
          xs={12}
          sm={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box>
            <MuiBaseInputView
              content={Moment.utc(item.started_at).local().format('MM/DD/YYYY')}
              label={t('general.fieldNames.dueDate')}
              isShowBottomBorder={false}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        sm={6}
        item
        sx={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid
          xs={12}
          sm={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MuiBaseInputView
            content={`${item.discount_amount ? item.discount_amount / 100 : item.amount / 100} $`}
            label={t('general.fieldNames.total')}
            isShowBottomBorder={false}
          />
        </Grid>

        <Grid
          xs={12}
          sm={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="default"
            sx={{
              color:
                item.status === 'open'
                  ? theme.palette.case.warning.high
                  : item.status === 'upcoming'
                  ? theme.palette.case.main.yellow.high
                  : theme.palette.primary.main,
            }}
          >
            {status.label}
          </Typography>
        </Grid>

        <Grid
          xs={12}
          sm={4}
          item
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {item.status === 'open' && (
            <MuiButton color="secondary" label={t('general.buttons.payNow')} size="small" type="button" />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default WalletDesktopItemHeader;
