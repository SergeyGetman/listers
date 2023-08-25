import React, { FC } from 'react';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { Box, Grid, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import { FormContactValues } from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import SelectEmailOrPhoneField from '../../../../formElements/SelectEmailOrPhoneField';
import { capitalizeFirstLetter } from '../../../../../shared/utils/capitalizeFirstLetter';
import {
  emailOrPhoneTypeSelectLeftData,
  emailOrPhoneTypeSelectRightData,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/config';
import MuiPhoneNumberTextFiled from '../../../../formElements/MuiPhoneNumberTextFiled';
import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer.style';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import MuiTooltip from '../../../../MuiTooltip';
import { EmailOrPhone } from '../../../../../shared/models/emailOrPhone.model';
import { ContactTypeEnum } from '../../../../../shared/enums/contactType.enum';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Images/delete-icon.svg';

type ContactPhoneItemProps = {
  index: number;
  item: EmailOrPhone;
  control: Control<FormContactValues>;
  contactFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.contact_list', 'id'>;
  setValue: UseFormSetValue<FormContactValues>;
  handleChangePhone: (number: string, country: string, index: number) => void;
  onChangeType: ({
    value,
    index,
    oldValue,
  }: {
    value: string;
    index: number;
    oldValue: ContactTypeEnum | string;
  }) => void;
};

const ContactPhoneItem: FC<ContactPhoneItemProps> = ({
  index,
  control,
  contactFormArray,
  handleChangePhone,
  setValue,
  item,
  onChangeType,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid item container rowSpacing="16px" columnSpacing="16px">
      <Grid sm={6} xs={12} item>
        <Controller
          name={`contacts.contact_list.${index}.type`}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <SelectEmailOrPhoneField
                leftColumnValue={item.contact_type}
                rightColumnValue={field.value ? field.value : ''}
                value={
                  !!field.value
                    ? `${capitalizeFirstLetter(field.value ? field.value : '')} ${item.contact_type}`
                    : capitalizeFirstLetter(item.contact_type ? item.contact_type : '')
                }
                placeholder={t('general.placeholders.select_type')}
                onChange={(value) => {
                  setValue(`contacts.contact_list.${index}.type`, value, {
                    shouldValidate: true,
                  });
                }}
                onChangeType={(value) => {
                  onChangeType({
                    index,
                    oldValue: item.contact_type,
                    value,
                  });
                }}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
                leftColumn={emailOrPhoneTypeSelectLeftData}
                rightColumn={emailOrPhoneTypeSelectRightData}
              />
            );
          }}
        />
      </Grid>
      <Grid sm={5.2} xs={11} item>
        <Controller
          name={`contacts.contact_list.${index}.value`}
          control={control}
          render={({ field, fieldState }) => (
            <MuiPhoneNumberTextFiled
              {...field}
              onChange={(value: string, country: string) => {
                handleChangePhone(value, country, index);
              }}
              placeholder={t('general.placeholders.enter_number')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              type="text"
            />
          )}
        />
      </Grid>

      <Grid sm={0.8} xs={1} item>
        <CreateContactModalContainerBtnContainer>
          <CreateContactModalContainerBtnContent>
            {index === 0 && contactFormArray.fields.length < 5 ? (
              <MuiIconButton
                onClick={() =>
                  contactFormArray.append({
                    country: '',
                    value: '',
                    type: null,
                    contact_type: ContactTypeEnum.phone,
                  })
                }
                color="secondary"
                size="medium"
              >
                <AddIcon
                  sx={{
                    color: theme.palette.case.primary.p600,
                  }}
                />
              </MuiIconButton>
            ) : (
              <MuiTooltip title={t('general.tooltips.remove')}>
                <Box>
                  <MuiIconButton
                    onClick={() => {
                      contactFormArray.remove(index);
                    }}
                    color="secondary"
                    size="medium"
                  >
                    <DeleteIcon
                      sx={{
                        '&:hover': {
                          color: theme.palette.case.warning.high,
                          transition: '0.3s',
                        },
                      }}
                    />
                  </MuiIconButton>
                </Box>
              </MuiTooltip>
            )}
          </CreateContactModalContainerBtnContent>
        </CreateContactModalContainerBtnContainer>
      </Grid>
    </Grid>
  );
};

export default ContactPhoneItem;
