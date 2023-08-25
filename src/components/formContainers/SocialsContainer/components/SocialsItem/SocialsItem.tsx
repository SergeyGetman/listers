import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, FieldArrayWithId, UseFieldArrayReturn } from 'react-hook-form';
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'react-i18next';

import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer.style';
import MuiIconButton from '../../../../buttons/MuiIconButton';
import MuiTooltip from '../../../../MuiTooltip';
import MuiSelect from '../../../../formElements/MuiSelect';
import MuiBaseTextFiled from '../../../../formElements/MuiBaseTextFiled';
import {
  FormContactValues,
  initialContactValues,
} from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/CreateContactModalContainer';
import { socialMediaSelectData } from '../../../../modals/network/CreateContactModal/CreateContactModalContainer/config';
import { ReactComponent as DeleteIcon } from '../../../../../assets/Images/delete-icon.svg';

type SocialsItemType = {
  index: number;
  control: Control<FormContactValues>;
  socialsFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.socials', 'id'>;
  item: FieldArrayWithId<FormContactValues, 'contacts.socials', 'id'>;
};

const SocialsItem: FC<SocialsItemType> = ({ index, control, item, socialsFormArray }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  return (
    <>
      <Grid key={item.id} item container rowSpacing="16px" columnSpacing="16px">
        <Grid sm={6} xs={12} item>
          <Controller
            name={`contacts.socials.${index}.type`}
            control={control}
            render={({ field, fieldState }) => (
              <MuiSelect
                {...field}
                isClearable
                startIcon={field?.value?.icon ? <field.value.icon /> : null}
                placeholder={t('general.placeholders.select_social_media')}
                options={socialMediaSelectData}
                isError={!!fieldState?.error?.message}
                helpText={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid sm={5.2} xs={11} item>
          <Controller
            name={`contacts.socials.${index}.value`}
            control={control}
            render={({ field, fieldState }) => (
              <MuiBaseTextFiled
                {...field}
                placeholder={t('general.placeholders.enter_nickname')}
                isError={!!fieldState?.error?.message}
                errorMessage={fieldState?.error?.message}
              />
            )}
          />
        </Grid>
        <Grid sm={0.8} xs={1} item>
          <CreateContactModalContainerBtnContainer>
            <CreateContactModalContainerBtnContent>
              {index === 0 && socialsFormArray.fields.length < 5 ? (
                <MuiIconButton
                  onClick={() => socialsFormArray.append(initialContactValues.contacts.socials[0])}
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
                      onClick={() => socialsFormArray.remove(index)}
                      color="secondary"
                      size="medium"
                    >
                      <DeleteIcon
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
    </>
  );
};

export default SocialsItem;
