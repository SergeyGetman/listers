import React, { useEffect, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/redux';
import { setBreadcrumbs } from '../../../../store/Common/commonThunk';
import WalletCardInfo from './components/WalletCardInfo';
import { WalletContainer } from './Wallet.style';
import MuiBaseAccordion from '../../../../components/accordions/MuiBaseAccordion';
import { getWalletItems } from '../../../../store/wallet/walletThunk';
import { resetWalletData, setWalletData } from '../../../../store/wallet/walletSlice';
import WalletDesktopItem from './components/WalletDesktopItem';
import WalletMobileItem from './components/WalletMobileItem';
import WalletNavigationPanel from './components/WalletNavigationPanel';
import { WalletItemModal } from '../../../../shared/models/wallet/walletItem.model';
import WalletSkeleton from './components/WalletSkeleton';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';
import Stub from '../../../../components/stubs/Stub';
import { noFilterMatchStubConfig } from '../../../../shared/configs/stub.config';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../shared/utils/observers/modalObserver';

const Wallet = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));
  const { filters, walletData } = useAppSelector(({ wallet }) => wallet);
  const profile = useAppSelector((state) => state.profile.data);
  const { t } = useTranslation();
  const [isGetInitialData, setIsGetInitialData] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setBreadcrumbs([{ title: t('general.breadcrumbs.settings.wallet') }]));
  }, [dispatch, t]);

  useEffect(() => {
    setIsGetInitialData(false);
    dispatch(getWalletItems(filters)).then((result) => {
      if (getWalletItems.fulfilled.match(result)) {
        dispatch(setWalletData(result.payload));
        setIsGetInitialData(true);
      }
    });

    return () => {
      dispatch(resetWalletData());
    };
  }, [filters, dispatch]);

  const handleOpenPaymentModal = (isEdit: boolean) => {
    modalObserver.addModal(ModalNamesEnum.payment, { props: { isEdit } });
  };

  return (
    <WalletContainer>
      <WalletCardInfo card={profile?.card_data} handleOpenPaymentModal={handleOpenPaymentModal} />

      <Box sx={{ mt: '30px', mb: '16px' }}>
        <MuiBaseAccordion
          infoTooltipText={t('wallet.tooltips.billingHistory')}
          isDefaultExpand
          isDisabledExpand
          label={t('general.containers.billingHistory')}
          isBoxShadow
        >
          <WalletNavigationPanel filters={filters} />
        </MuiBaseAccordion>

        <Box sx={{ mt: '20px', pb: '150px' }}>
          {isGetInitialData ? (
            <>
              {walletData.data.length ? (
                <>
                  {walletData.data.map((item: WalletItemModal, index: number) => (
                    <Box key={index} sx={{ mb: '16px' }}>
                      {isMobileDisplay ? <WalletMobileItem item={item} /> : <WalletDesktopItem item={item} />}
                    </Box>
                  ))}
                </>
              ) : (
                <>
                  <PageStubContainer isNoFilterMatch>
                    <Stub isBoltSubtitleText={false} value={noFilterMatchStubConfig} />
                  </PageStubContainer>
                </>
              )}
            </>
          ) : (
            <WalletSkeleton />
          )}
        </Box>
      </Box>
    </WalletContainer>
  );
};

export default Wallet;
