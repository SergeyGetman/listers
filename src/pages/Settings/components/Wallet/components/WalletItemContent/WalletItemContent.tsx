import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Grid, Typography } from '@mui/material';
import { WalletItemContentContainer, WalletItemContentRow } from './WalletItemContent.style';
import { WalletItemModal } from '../../../../../../shared/models/wallet/walletItem.model';
type WalletItemContentProps = {
  item: WalletItemModal;
};
// TODO enum && config
const WalletItemContent: FC<WalletItemContentProps> = ({ item }) => {
  const { t } = useTranslation();
  return (
    <WalletItemContentContainer>
      <WalletItemContentRow container>
        <Grid xs={9} sm={6} item>
          <Typography variant="default">
            {t('wallet.billingHistoryInfo.billingHistoryInfoTitle.includes')}
          </Typography>
        </Grid>
        <Grid
          sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'flex-end', sm: 'flex-start' } }}
          xs={3}
          sm={3}
          item
        >
          <Typography variant="default" sx={{ width: '70px' }}>
            {t('wallet.billingHistoryInfo.billingHistoryInfoTitle.unitPrice')}
          </Typography>
        </Grid>
      </WalletItemContentRow>
      {item.items.map((hub, index) => {
        if (hub.name === 'Starter') {
          return <></>;
        }
        return (
          <WalletItemContentRow container key={index}>
            <Grid xs={9} sm={6} item>
              <Typography variant="small">{hub.name}</Typography>
            </Grid>
            <Grid
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-end', sm: 'flex-start' },
              }}
              xs={3}
              sm={6}
              item
            >
              <Typography sx={{ width: '70px' }} variant="small">
                {`${
                  hub.is_free ? 'free' : hub.discount_amount ? hub.discount_amount / 100 : hub.amount / 100
                }$`}
              </Typography>
            </Grid>
          </WalletItemContentRow>
        );
      })}
    </WalletItemContentContainer>
  );
};

export default WalletItemContent;
