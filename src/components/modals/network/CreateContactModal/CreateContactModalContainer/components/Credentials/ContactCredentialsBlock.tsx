import React, { FC } from 'react';
import { Box, Grid, useTheme } from '@mui/material';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import MuiDotAccordion from '../../../../../../accordions/MuiDotAccordion';
import MuiBaseTextFiled from '../../../../../../formElements/MuiBaseTextFiled';
import MuiSelect from '../../../../../../formElements/MuiSelect';
import CircularButton from '../../../../../../buttons/CilrcularButton';
import { socialMediaSelectData, urlSelectData } from '../../config';
import { FormContactValues, initialContactValues } from '../../CreateContactModalContainer';
import MuiIconButton from '../../../../../../buttons/MuiIconButton';
import {
  CreateContactModalContainerBtnContainer,
  CreateContactModalContainerBtnContent,
} from '../../CreateContactModalContainer.style';
import MuiTooltip from '../../../../../../MuiTooltip';

type Props = {
  control: Control<FormContactValues>;
  urlsFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.urls', 'id'>;
  socialsFormArray: UseFieldArrayReturn<FormContactValues, 'contacts.socials', 'id'>;
};

const ContactCredentialsBlock: FC<Props> = ({ control, urlsFormArray, socialsFormArray }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <MuiDotAccordion
      label={t('general.containers.credentials')}
      isDisabledExpand={false}
      isDefaultExpand={!!urlsFormArray.fields[0].type || !!socialsFormArray.fields[0].type}
    >
      <Grid container rowSpacing="16px">
        {urlsFormArray.fields.map((item, index) => (
          <Grid key={item.id} item container rowSpacing="16px" columnSpacing="20px">
            <Grid sm={6} xs={12} item>
              <Controller
                name={`contacts.urls.${index}.type`}
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <MuiSelect
                      {...field}
                      isClearable
                      label={t('general.fieldNames.type')}
                      placeholder={t('general.placeholders.select_type')}
                      options={urlSelectData}
                      isError={!!fieldState?.error?.message}
                      helpText={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </Grid>
            <Grid sm={5.5} xs={11} item>
              <Controller
                name={`contacts.urls.${index}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiBaseTextFiled
                    {...field}
                    label={t('general.fieldNames.url')}
                    placeholder={t('general.placeholders.enter_url')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={0.5} xs={1} item>
              <CreateContactModalContainerBtnContainer>
                <CreateContactModalContainerBtnContent>
                  {index === 0 && urlsFormArray.fields.length < 5 ? (
                    <CircularButton
                      size="small"
                      onClick={() => urlsFormArray.append(initialContactValues.contacts.urls[0])}
                    />
                  ) : (
                    <MuiTooltip title={t('general.tooltips.remove')}>
                      <Box>
                        <MuiIconButton
                          onClick={() => urlsFormArray.remove(index)}
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
      <Grid sx={{ mt: '2px' }} container rowSpacing="16px">
        {socialsFormArray.fields.map((item, index) => (
          <Grid key={item.id} item container rowSpacing="16px" columnSpacing="20px">
            <Grid sm={6} xs={12} item>
              <Controller
                name={`contacts.socials.${index}.type`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiSelect
                    {...field}
                    isClearable
                    label={t('general.fieldNames.socialMedia')}
                    placeholder={t('general.placeholders.select_social_media')}
                    options={socialMediaSelectData}
                    isError={!!fieldState?.error?.message}
                    helpText={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={5.5} xs={11} item>
              <Controller
                name={`contacts.socials.${index}.value`}
                control={control}
                render={({ field, fieldState }) => (
                  <MuiBaseTextFiled
                    {...field}
                    label={t('general.fieldNames.nickName')}
                    placeholder={t('general.placeholders.enter_nickname')}
                    isError={!!fieldState?.error?.message}
                    errorMessage={fieldState?.error?.message}
                  />
                )}
              />
            </Grid>
            <Grid sm={0.5} xs={1} item>
              <CreateContactModalContainerBtnContainer>
                <CreateContactModalContainerBtnContent>
                  {index === 0 && socialsFormArray.fields.length < 5 ? (
                    <CircularButton
                      size="small"
                      onClick={() => socialsFormArray.append(initialContactValues.contacts.urls[0])}
                    />
                  ) : (
                    <MuiTooltip title={t('general.tooltips.remove')}>
                      <Box>
                        <MuiIconButton
                          onClick={() => socialsFormArray.remove(index)}
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

export default ContactCredentialsBlock;
