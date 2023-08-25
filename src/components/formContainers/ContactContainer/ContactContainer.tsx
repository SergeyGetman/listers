import React, { FC } from 'react';
import { Control, UseFieldArrayReturn } from 'react-hook-form';
import { Grid } from '@mui/material';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { FormContactValues } from '../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import ContactPhoneItem from './components/ContactPhoneItem';
import { ContactTypeEnum } from '../../../shared/enums/contactType.enum';
import ContactEmailItem from './components/ContactEmailItem';

type ContactContainerProps = {
  control: Control<FormContactValues>;
  contactFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.contact_list', 'id'>;
  setValue: UseFormSetValue<FormContactValues>;
  handleChangePhone: (number: string, country: string, index: number) => void;
};

const ContactContainer: FC<ContactContainerProps> = ({
  control,
  contactFormArray,
  setValue,
  handleChangePhone,
}) => {
  const onChangeType = ({
    value,
    index,
    oldValue,
  }: {
    value: string;
    index: number;
    oldValue: ContactTypeEnum | string;
  }) => {
    if (value === ContactTypeEnum.email && oldValue !== ContactTypeEnum.email) {
      contactFormArray.update(index, { value: '', type: '', contact_type: ContactTypeEnum.email });
    } else if (value === ContactTypeEnum.phone && oldValue !== ContactTypeEnum.phone) {
      contactFormArray.update(index, {
        value: '',
        type: null,
        country: '',
        contact_type: ContactTypeEnum.phone,
      });
    }
  };

  return (
    <Grid container rowSpacing="16px" columnSpacing="16px">
      {contactFormArray.fields.map((item, index) =>
        item.contact_type === ContactTypeEnum.phone ? (
          <ContactPhoneItem
            key={index}
            item={item}
            index={index}
            contactFormArray={contactFormArray}
            setValue={setValue}
            control={control}
            handleChangePhone={handleChangePhone}
            onChangeType={onChangeType}
          />
        ) : (
          <ContactEmailItem
            key={index}
            item={item}
            index={index}
            contactFormArray={contactFormArray}
            setValue={setValue}
            control={control}
            onChangeType={onChangeType}
          />
        ),
      )}
    </Grid>
  );
};

export default ContactContainer;
