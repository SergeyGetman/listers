import React, { FC, useCallback, useState } from 'react';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import BaseContainer from '../../../../../../../../containers/BaseContainer';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import MainInformationFormContainer from '../../../../../../../../formContainers/insurance/MainInformationFormContainer';
import DeductiblesFormContainer from '../../../../../../../../formContainers/insurance/DeductiblesFormContainer';
import { validation } from './validation';
import Attachments from '../../../../../../../../media/Attachemts';
import { MediaType } from '../../../../../../../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../../../../../../../shared/enums/documentEntityType.enum';
type FirstSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const FirstSubStep: FC<FirstSubStepProps> = ({ handleSelectStep }) => {
  // TODO CONNECT DOCUMENTS TO FORM
  const { t } = useTranslation();
  const [frontAttachment, setFrontAttachment] = useState<MediaType[]>([]);
  const [backAttachment, setBackAttachment] = useState<MediaType[]>([]);
  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const handleAddFrontAttachment = useCallback((newMedia: MediaType[]) => {
    setFrontAttachment(newMedia);
  }, []);
  const handleAddBackAttachment = useCallback((newMedia: MediaType[]) => {
    setBackAttachment(newMedia);
  }, []);

  const initialValue = {
    issued_by: '',
    policy_number: '',
    naic: '',
    collision: null,
    comprehensive: null,
  };

  const onSubmit = (formData: any) => {
    selectStepHandler(FormStepsEnum.step_second, FormSubStepsEnum.sub_step_second);
    return formData;
  };

  const { control, handleSubmit } = useForm<any>({
    defaultValues: initialValue,
    resolver: yupResolver(validation),
  });

  const handleNextStepClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormSubStepContainer
      skipBtnProps={{
        isShow: true,
        label: t('general.buttons.skipInsurance'),
        onClick: () => selectStepHandler(FormStepsEnum.step_third, FormSubStepsEnum.sub_step_first),
      }}
      backBtnProps={{
        isShow: true,
        label: t('general.buttons.back'),
        startIcon: <ArrowLeft />,
        onClick: () => selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_fourth),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.next'),
        endIcon: <ArrowRight />,
        onClick: () => handleNextStepClick(),
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <MainInformationFormContainer control={control} />
        <Box sx={{ mt: '24px', width: '100%' }}>
          <DeductiblesFormContainer control={control} />
        </Box>
        <Box sx={{ mt: '24px', width: '100%' }}>
          <BaseContainer title={t('general.containers.insuranceCad')} subTitle="???">
            <Grid
              container
              columnSpacing={{ xs: '12px', sm: '16px', md: '24px' }}
              rowSpacing={{ xs: '12px', sm: '16px', md: '24px' }}
              alignItems="center"
            >
              <Grid xs={6} item>
                <Attachments
                  attachmentCardsGridConfig={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                  maxAttachmentsLength={1}
                  attachmentType="file"
                  attachments={frontAttachment}
                  handleAddAttachment={handleAddFrontAttachment}
                  entityType={DocumentsEntityTypeEnum.insurance_card_front_document}
                />
              </Grid>
              <Grid xs={6} item>
                <Attachments
                  attachmentCardsGridConfig={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                  maxAttachmentsLength={1}
                  attachmentType="file"
                  attachments={backAttachment}
                  handleAddAttachment={handleAddBackAttachment}
                  entityType={DocumentsEntityTypeEnum.insurance_card_back_document}
                />
              </Grid>
            </Grid>
          </BaseContainer>
        </Box>
      </Box>
    </FormSubStepContainer>
  );
};

export default FirstSubStep;
