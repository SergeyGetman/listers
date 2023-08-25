import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Control, UseFormSetValue } from 'react-hook-form/dist/types/form';
import { useFieldArray } from 'react-hook-form';
import RowWithTitleContainer from '../../../../../../containers/RowWithTitleContainer';
import { FormContactValues } from '../../CreateContactModalContainer';
import AddressesContainer from '../../../../../../formContainers/AddressesContainer';
import SocialsContainer from '../../../../../../formContainers/SocialsContainer';
import { ContactMainBlockItemContainer } from './ContactContactsBlock.style';

import ContactContainer from '../../../../../../formContainers/ContactContainer';

type Props = {
  control: Control<FormContactValues>;
  setValue: UseFormSetValue<FormContactValues>;
};

const ContactContactsBlock: FC<Props> = ({ control, setValue }) => {
  const socialsFormArray = useFieldArray({
    control,
    name: 'contacts.socials',
  });

  const contactFormArray = useFieldArray({
    control,
    name: 'contacts.contact_list',
  });
  const addressFormArray = useFieldArray({
    control,
    name: 'contacts.addresses',
  });

  const handleChangePhone = (phone: string, country: string, index: number) => {
    setValue(`contacts.contact_list.${index}.value`, phone, {
      shouldValidate: true,
    });
    setValue(`contacts.contact_list.${index}.country`, country);
  };

  const handleChangeAddress = (address: string, index: number, map?: { lat?: number; lng?: number }) => {
    setValue(`contacts.addresses.${index}.address`, address, {
      shouldValidate: true,
    });
    setValue(`contacts.addresses.${index}.map`, map);
  };

  return (
    <Box>
      <RowWithTitleContainer titlePadding="10" alignItems="flexStart" title="Contact">
        <ContactContainer
          control={control}
          handleChangePhone={handleChangePhone}
          contactFormArray={contactFormArray}
          setValue={setValue}
        />
      </RowWithTitleContainer>

      <ContactMainBlockItemContainer>
        <RowWithTitleContainer titlePadding="10" alignItems="flexStart" title="Socials">
          <SocialsContainer socialsFormArray={socialsFormArray} control={control} />
        </RowWithTitleContainer>
      </ContactMainBlockItemContainer>
      <ContactMainBlockItemContainer>
        <RowWithTitleContainer titlePadding="10" alignItems="flexStart" title="Address">
          <AddressesContainer
            control={control}
            addressFormArray={addressFormArray}
            handleChangeAddress={handleChangeAddress}
          />
        </RowWithTitleContainer>
      </ContactMainBlockItemContainer>
    </Box>
  );
};

export default ContactContactsBlock;
