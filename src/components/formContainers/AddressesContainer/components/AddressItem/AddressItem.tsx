import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import LocationEdit from '../../../../locations/LocationEdit';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import MuiTooltip from '../../../../MuiTooltip';
import MuiSelect from '../../../../formElements/MuiSelect';

import { locationSelectData } from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/config';
import {
  FormContactValues,
  initialContactValues,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Images/delete-icon.svg';
import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer.style';

type AddressItemType = {
  index: number;
  control: Control<FormContactValues>;
  handleChangeAddress: (address: string, index: number, map?: { lat?: number; lng?: number }) => void;
  addressFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.addresses', 'id'>;
};

const AddressItem: FC<AddressItemType> = ({ index, control, handleChangeAddress, addressFormArray }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <Grid
      container
      key={index}
      rowSpacing="16px"
      sx={{ mb: '16px' }}
      columnSpacing="20px"
      direction="column-reverse"
    >
      <Grid item sm={14} xs={14}>
        <Grid columnSpacing="16px" container>
          <Grid item sm={11} xs={11}>
            <Controller
              control={control}
              name={`contacts.addresses.${index}`}
              render={({ field, fieldState }) => (
                <LocationEdit
                  {...field}
                  onChange={(value) => handleChangeAddress(value.address || '', index, value.map)}
                  placeholder={t('general.placeholders.enter_location')}
                  isError={!!fieldState?.error?.message}
                  errorMessage={fieldState?.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item sm={1} xs={1}>
            <CreateContactModalContainerBtnContainer>
              <CreateContactModalContainerBtnContent>
                {index === 0 && addressFormArray.fields.length < 5 ? (
                  <MuiIconButton
                    onClick={() => addressFormArray.append(initialContactValues.contacts.addresses[0])}
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
                        onClick={() => addressFormArray.remove(index)}
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
      </Grid>

      <Grid item sm={14} xs={14}>
        <Grid item sm={5.8} xs={14}>
          <Controller
            name={`contacts.addresses.${index}.type`}
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
                placeholder={t('general.placeholders.select_type')}
                options={locationSelectData}
              />
            )}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AddressItem;
