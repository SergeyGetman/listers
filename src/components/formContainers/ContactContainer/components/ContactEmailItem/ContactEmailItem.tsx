import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { UseFormSetValue } from 'react-hook-form/dist/types/form';
import { useTranslation } from 'react-i18next';

import SelectEmailOrPhoneField from '../../../../formElements/SelectEmailOrPhoneField';
import { capitalizeFirstLetter } from '../../../../../shared/utils/capitalizeFirstLetter';
import {
  emailOrPhoneTypeSelectLeftData,
  emailOrPhoneTypeSelectRightData,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/config';
import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer.style';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import MuiTooltip from '../../../../MuiTooltip';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Images/delete-icon.svg';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import { EmailOrPhone } from '../../../../../shared/models/emailOrPhone.model';
import { ContactTypeEnum } from '../../../../../shared/enums/contactType.enum';
import { FormContactValues } from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';

type ContactEmailItemProps = {
  index: number;
  item: EmailOrPhone;
  control: Control<FormContactValues>;
  contactFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.contact_list', 'id'>;
  setValue: UseFormSetValue<FormContactValues>;
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

const ContactEmailItem: FC<ContactEmailItemProps> = ({
  index,
  control,
  contactFormArray,
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
          render={({ field, fieldState }) => (
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
                  oldValue: item.contact_type,
                  value,
                  index,
                });
              }}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
              leftColumn={emailOrPhoneTypeSelectLeftData}
              rightColumn={emailOrPhoneTypeSelectRightData}
            />
          )}
        />
      </Grid>
      <Grid sm={5.2} xs={11} item>
        <Controller
          name={`contacts.contact_list.${index}.value`}
          control={control}
          render={({ field, fieldState }) => (
            <MuiBaseTextFiled
              {...field}
              placeholder={t('general.placeholders.enter_email')}
              isError={!!fieldState?.error?.message}
              errorMessage={fieldState?.error?.message}
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
                    value: '',
                    type: null,
                    contact_type: ContactTypeEnum.email,
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

export default ContactEmailItem;
