import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import Moment from 'moment';
import MuiBaseInputView from '../../../../../../../../components/formElements/MuiBaseInputView';
import { WalletMobileItemHeaderContainer } from './WalletMobileItemHeader.style';
import { WalletItemModal } from '../../../../../../../../shared/models/wallet/walletItem.model';
import { walletItemStatusConfig } from '../../../../../../../../shared/configs/walletItemStatus.config';

type WalletMobileItemHeaderProps = {
  item: WalletItemModal;
};
const WalletMobileItemHeader: FC<WalletMobileItemHeaderProps> = ({ item }) => {
  const { t } = useTranslation();
  const status = walletItemStatusConfig[item.status];
  return (
    <Box sx={{ p: '0 16px', display: 'flex', alignItems: 'center', width: '100%', height: 70 }}>
      <Box>
        <status.icon />
      </Box>
      <WalletMobileItemHeaderContainer>
        <Box>
          <MuiBaseInputView
            content={`${item.id}`}
            label={t('general.fieldNames.invoiceID')}
            isShowBottomBorder={false}
          />
        </Box>
        <Box>
          <MuiBaseInputView
            content={Moment.utc(item.started_at).local().format('MM/DD/YYYY')}
            label={t('general.fieldNames.dueDate')}
            isShowBottomBorder={false}
          />
        </Box>
        <Box sx={{ width: '65px' }}>
          <MuiBaseInputView
            content={`${item.discount_amount ? item.discount_amount / 100 : item.amount / 100} $`}
            label={t('general.fieldNames.total')}
            isShowBottomBorder={false}
          />
        </Box>
      </WalletMobileItemHeaderContainer>
    </Box>
  );
};

export default WalletMobileItemHeader;
