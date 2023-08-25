import React, { FC } from 'react';
import { Grid } from '@mui/material';
import { Control, UseFieldArrayReturn } from 'react-hook-form';

import { FormContactValues } from '../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import AddressItem from './components/AddressItem';

type AddressesContainerProps = {
  control: Control<FormContactValues>;
  handleChangeAddress: (address: string, index: number, map?: { lat?: number; lng?: number }) => void;
  addressFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.addresses', 'id'>;
};

const AddressesContainer: FC<AddressesContainerProps> = ({
  control,
  handleChangeAddress,
  addressFormArray,
}) => {
  return (
    <Grid container direction="column">
      {addressFormArray.fields.map((item, index) => (
        <AddressItem
          key={index}
          index={index}
          control={control}
          handleChangeAddress={handleChangeAddress}
          addressFormArray={addressFormArray}
        />
      ))}
    </Grid>
  );
};

export default AddressesContainer;
