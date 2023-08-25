import React, { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormStepsEnum, FormSubStepsEnum } from '../../../../../../../../../shared/enums/formSteps.enum';
import FormSubStepContainer from '../../../../../../../../containers/FormSubStepContainer';
import { ReactComponent as ArrowLeft } from '../../../../../../../../../assets/Images/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../../../../../../../../assets/Images/arrow-right.svg';
import DocumentsContainer from '../../../../../../../../formContainers/DocumentsContainer';
import { MediaType } from '../../../../../../../../../shared/models/media.model';
import { DocumentsEntityTypeEnum } from '../../../../../../../../../shared/enums/documentEntityType.enum';
type FourthSubStepProps = {
  handleSelectStep: (step: FormStepsEnum, subStepId?: FormSubStepsEnum) => void;
};
const FourthSubStep: FC<FourthSubStepProps> = ({ handleSelectStep }) => {
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
        onClick: () => selectStepHandler(FormStepsEnum.step_first, FormSubStepsEnum.sub_step_third),
      }}
      nextBtnProps={{
        isShow: true,
        label: t('general.buttons.proceedToInsurance'),
        endIcon: <ArrowRight />,
        onClick: () => selectStepHandler(FormStepsEnum.step_second, FormSubStepsEnum.sub_step_first),
      }}
    >
      <DocumentsContainer
        entityType={DocumentsEntityTypeEnum.section_document}
        attachments={attachments}
        handleAddAttachment={handleAddAttachment}
      />
    </FormSubStepContainer>
  );
};

export default FourthSubStep;
