import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MuiSelect from '../../formElements/MuiSelect';
import { phoneTypeSelectData } from '../../modals/network/CreateContactModal/CreateContactModalContainer/config';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiPhoneNumberTextFiled from '../../formElements/MuiPhoneNumberTextFiled';
import CircularButton from '../../buttons/CilrcularButton';
import MuiIconButton from '../../buttons/MuiIconButton';
import { SelectOptionsModel } from '../../../shared/models/selectOptions.model';
import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer.style';
import MuiTooltip from '../../MuiTooltip';
import { ContactTypeEnum } from '../../../shared/enums/contactType.enum';

type Props = {
  control: Control<any>;
  filedTypeOptions?: SelectOptionsModel;
  phonesFormArray: UseFieldArrayReturn<any, 'contacts.phones', 'id'>;
  handleChangePhone: (number: string, country: string, index: number) => void;
};

const ContactPhoneNumberBlock: FC<Props> = ({
  control,
  phonesFormArray,
  handleChangePhone,
  filedTypeOptions,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MuiDotAccordion label={t('general.containers.phoneNumber')} isDisabledExpand>
      <Grid container rowSpacing="16px">
        {phonesFormArray.fields.map((item, index) => (
          <Grid key={item.id} item container rowSpacing="16px" columnSpacing="20px">
            <Grid sm={6} xs={12} item>
              <Controller
                name={`contacts.phones.${index}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isClearable
                    options={filedTypeOptions ? filedTypeOptions : phoneTypeSelectData}
                    label={t('general.fieldNames.type')}
                    placeholder={t('general.placeholders.select_type')}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={5.5} xs={11} item>
              <Controller
                name={`contacts.phones.${index}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiPhoneNumberTextFiled
                    {...field}
                    label={t('general.fieldNames.phone')}
                    onChange={(value: string, country: string) => handleChangePhone(value, country, index)}
                    placeholder={t('general.placeholders.enter_number')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                    type="text"
                  />
                )}
              />
            </Grid>

            <Grid sm={0.5} xs={1} item>
              <CreateContactModalContainerBtnContainer>
                <CreateContactModalContainerBtnContent>
                  {index === 0 && phonesFormArray.fields.length < 5 ? (
                    <CircularButton
                      size="small"
                      onClick={() =>
                        phonesFormArray.append({
                          country: '',
                          value: '',
                          type: null,
                          contact_type: ContactTypeEnum.phone,
                        })
                      }
                    />
                  ) : (
                    <MuiTooltip title={t('general.tooltips.remove')}>
                      <Box>
                        <MuiIconButton
                          onClick={() => {
                            phonesFormArray.remove(index);
                          }}
                          color="secondary"
                          size="small"
                        >
                          <DeleteForeverOutlinedIcon
                            sx={{
                              '&:hover': { color: theme.palette.case.warning.high, transition: '0.3s' },
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
        ))}
      </Grid>
    </MuiDotAccordion>
  );
};

export default ContactPhoneNumberBlock;
