import React, { FC } from 'react';
import { Control, UseFieldArrayReturn } from 'react-hook-form';
import { Grid } from '@mui/material';

import { FormContactValues } from '../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import SocialsItem from './components/SocialsItem';

type SocialsContainerProps = {
  control: Control<FormContactValues>;
  socialsFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.socials', 'id'>;
};

const SocialsContainer: FC<SocialsContainerProps> = ({ control, socialsFormArray }) => {
  return (
    <Grid container rowSpacing="16px" columnSpacing="16px">
      {socialsFormArray.fields.map((item, index) => (
        <SocialsItem
          key={index}
          index={index}
          control={control}
          item={item}
          socialsFormArray={socialsFormArray}
        />
      ))}
    </Grid>
  );
};

export default SocialsContainer;
