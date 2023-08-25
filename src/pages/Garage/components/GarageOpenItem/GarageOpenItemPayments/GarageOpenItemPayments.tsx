import React, { FC, useMemo } from 'react';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import MuiBaseAccordion from '../../../../../components/accordions/MuiBaseAccordion';
import { GarageTransportPaymentModel } from '../../../../../shared/models/garage.model';
import MuiBaseMobileAccordion from '../../../../../components/accordions/MuiBaseMobileAccordion';
import GaragePaymentHeader from './GaragePaymentHeader';
import WalletDesktopItemContent from './GaragePaymentContent';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  payments: GarageTransportPaymentModel[];
};

const GarageOpenItemPayments: FC<Props> = ({ payments }) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenPaymentModal = (id: number, isOpenEditMode: boolean = false) => {
    modalObserver.addModal(ModalNamesEnum.viewPaymentModal, {
      props: {
        paymentId: id,
        isOpenEditMode: isOpenEditMode,
      },
    });
  };

  const renderContent = useMemo(() => {
    return (
      <Grid container rowSpacing="16px">
        {payments.map((item) => (
          <Grid xs={12} key={item.id} item>
            <MuiBaseMobileAccordion
              isCustomHeader
              isDefaultExpand={false}
              isDefaultHeaderPadding={false}
              // isBlurred={item.status === 'upcoming'}
              isBlurred={false}
              headerComponent={<GaragePaymentHeader item={item} />}
            >
              {/* <WalletItemContent item={item} /> 1{' '} */}
              <WalletDesktopItemContent item={item} handleOpenPaymentModal={handleOpenPaymentModal} />
            </MuiBaseMobileAccordion>
          </Grid>
        ))}
      </Grid>
    );
  }, [payments]);

  return isMobileDisplay ? (
    <MuiBaseMobileAccordion isEdit={false} title="Payments">
      {renderContent}
    </MuiBaseMobileAccordion>
  ) : (
    <MuiBaseAccordion withHover label="Payments" isShowInfoDialog={false} isDisabledExpand={false}>
      {renderContent}
    </MuiBaseAccordion>
  );
};

export default GarageOpenItemPayments;
