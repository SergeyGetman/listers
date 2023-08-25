import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Moment from 'moment';
import { Grid } from '@mui/material';
import { WalletDesktopItemHeaderStatus } from '../../../../Settings/components/Wallet/components/WalletDesktopItem/components/WalletDesktopItemHeader/WalletDesktopItemHeader.style';
import MuiBaseInputView from '../../../../../components/formElements/MuiBaseInputView';
import { GarageTransportPaymentModel } from '../../../../../shared/models/garage.model';
import { GaragePaymentType } from '../../../../../shared/enums/garage.enums';
import { plannerItemStatusesConfig } from '../../../../../shared/configs/plannerItemStatuses.config';

type WalletDesktopItemHeaderProps = {
  item: GarageTransportPaymentModel;
};

const WalletDesktopItemHeader: FC<WalletDesktopItemHeaderProps> = ({ item }) => {
  const { t } = useTranslation();
  const status = plannerItemStatusesConfig[item.status];
  return (
    <Grid
      columnSpacing="10px"
      container
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
      }}
    >
      <WalletDesktopItemHeaderStatus isHideBorder xs={1} sm={2} item>
        <status.icon />
      </WalletDesktopItemHeaderStatus>
      <Grid
        xs={4}
        sm={3}
        item
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <MuiBaseInputView content={item.name || '-'} label={item.object} isShowBottomBorder={false} />
      </Grid>
      <Grid xs={4} item>
        <MuiBaseInputView
          content={Moment(item.expiration_at).format('MM/DD/YYYY')}
          label={t('general.fieldNames.expirationDate')}
          isShowBottomBorder={false}
        />
      </Grid>

      <Grid xs={3} item>
        <MuiBaseInputView
          content={`${item.amount / 100} $`}
          label={
            item.object === GaragePaymentType.insurance
              ? t('general.fieldNames.amount')
              : t('general.fieldNames.totalAmount')
          }
          isShowBottomBorder={false}
        />
      </Grid>
    </Grid>
  );
};

export default WalletDesktopItemHeader;
