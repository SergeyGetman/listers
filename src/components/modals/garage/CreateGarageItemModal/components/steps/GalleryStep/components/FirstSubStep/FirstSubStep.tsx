import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import { MediaType } from '../../../../../../../../../shared/models/media.model';
import GalleryContainer from '../../../../../../../../formContainers/GalleryContainer';
import { PhotoEntityTypeEnum } from '../../../../../../../../../shared/enums/photoEntityType.enum';
type FirstSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const FirstSubStep: FC<FirstSubStepProps> = ({ handleSelectStep }) => {
  const { t } = useTranslation();
  const [attachments, setAttachments] = useState<MediaType[]>([]);

  const selectStepHandler = (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => {
    handleSelectStep(step, subStepId);
  };

  const handleAddAttachment = useCallback((newMedia: MediaType[]) => {
    setAttachments(newMedia);
  }, []);

  return (
    <FormSubStepContainer
      backBtnProps={{
        isShow: true,
        label: t('general.buttons.back'),
        startIcon: <ArrowLeft />,
        onClick: () => selectStepHandler(FormStepsEnum.step_fourth, FormSubStepsEnum.sub_step_fourth),
      }}
    >
      <GalleryContainer
        entityType={PhotoEntityTypeEnum.transport_photo}
        attachments={attachments}
        handleAddAttachment={handleAddAttachment}
      />
    </FormSubStepContainer>
  );
};

export default FirstSubStep;
