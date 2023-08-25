import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { useTranslation } from 'react-i18next';
import MuiDotAccordion from '../../accordions/MuiDotAccordion';
import MuiSelect from '../../formElements/MuiSelect';
import MuiBaseTextFiled from '../../formElements/MuiBaseTextFiled';
import CircularButton from '../../buttons/CilrcularButton';
import MuiIconButton from '../../buttons/MuiIconButton';
import { emailTypeSelectData } from '../../modals/network/CreateContactModal/CreateContactModalContainer/config';
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

  emailsFormArray: UseFieldArrayReturn<any, 'contacts.emails', 'id'>;
};

const ContactEmailBlock: FC<Props> = ({ control, emailsFormArray, filedTypeOptions }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MuiDotAccordion label={t('general.fieldNames.email')} isDisabledExpand>
      <Grid container rowSpacing="16px">
        {emailsFormArray.fields.map((item, index) => (
          <Grid key={item.id} item container rowSpacing="16px" columnSpacing="20px">
            <Grid sm={6} xs={12} item>
              <Controller
                name={`contacts.emails.${index}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isClearable
                    label={t('general.fieldNames.type')}
                    placeholder={t('general.placeholders.select_type')}
                    options={filedTypeOptions ? filedTypeOptions : emailTypeSelectData}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={5.5} xs={11} item>
              <Controller
                name={`contacts.emails.${index}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiBaseTextFiled
                    {...field}
                    label={t('general.fieldNames.email')}
                    placeholder={t('general.placeholders.enter_email')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={0.5} xs={1} item>
              <CreateContactModalContainerBtnContainer>
                <CreateContactModalContainerBtnContent>
                  {index === 0 && emailsFormArray.fields.length < 5 ? (
                    <CircularButton
                      size="small"
                      onClick={() =>
                        emailsFormArray.append({
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
                          onClick={() => emailsFormArray.remove(index)}
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

export default ContactEmailBlock;
