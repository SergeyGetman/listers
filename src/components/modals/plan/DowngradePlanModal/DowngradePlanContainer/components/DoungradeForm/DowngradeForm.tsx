import React, { FC, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DowngradeFormsContainer from '../DowngradeFormsContainer';
import NestedCheckbox from './components/NestedCheckbox';
import NestedTextInput from './components/NestedTextInput';
import { PlanFormChecksContainer } from './DowngradeForm.styled';

export type DowngradeFormType = {
  first: boolean;
  second: boolean;
  third: boolean;
  forth: boolean;
  other: boolean;
  text: string;
};

type Props = {
  onSaveForm: (form: DowngradeFormType) => void;
  onClose: () => void;
  formState: DowngradeFormType | null;
  countStep: number;
};
const defaultValues = {
  first: false,
  second: false,
  third: false,
  forth: false,
  other: false,
  text: '',
};

const DowngradeForm: FC<Props> = ({ onSaveForm, onClose, formState, countStep }) => {
  const [rightButtonDisabled, setRightButtonDisabled] = useState<boolean>(true);
  const methods = useForm<DowngradeFormType>({
    defaultValues,
  });
  const { t } = useTranslation();

  const onSubmit = (form: DowngradeFormType) => {
    onSaveForm(form);
  };

  useEffect(() => {
    if (formState) {
      methods.reset(formState);
    }

    const subscription = methods.watch(({ first, second, third, forth, text = '' }) => {
      setRightButtonDisabled(() => {
        return !(first || second || third || forth || text.length > 2);
      });
    });

    return () => subscription.unsubscribe();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form style={{ width: '100%' }} onSubmit={methods.handleSubmit(onSubmit)}>
      <DowngradeFormsContainer
        title={t('plans.downgrade.title')}
        countSteps={countStep}
        onClose={onClose}
        step={1}
        rightBtnProps={{
          isShow: true,
          label: t('plans.button.continue'),
          variant: 'contained',
          type: 'submit',
          isDisabled: rightButtonDisabled,
          isStopPropagation: false,
        }}
        middleBtnProps={{ isShow: true, label: t('plans.button.stay'), type: 'button', onClick: onClose }}
      >
        <FormProvider {...methods}>
          <Box>
            <Typography variant="large_bolt">{t('plans.downgrade.step1.title')}</Typography>
            <Box display="flex" flexDirection="column" mt="16px">
              <PlanFormChecksContainer>
                <NestedCheckbox name="first" />
              </PlanFormChecksContainer>
              <PlanFormChecksContainer>
                <NestedCheckbox name="second" />
              </PlanFormChecksContainer>

              <PlanFormChecksContainer>
                <NestedCheckbox name="third" />
              </PlanFormChecksContainer>
              <PlanFormChecksContainer>
                <NestedCheckbox name="forth" />
              </PlanFormChecksContainer>
              <PlanFormChecksContainer
                sx={{
                  marginBottom: 0,
                }}
              >
                <NestedCheckbox name="other" />
              </PlanFormChecksContainer>
              <Box mt="12px">
                <NestedTextInput />
              </Box>
            </Box>
          </Box>
        </FormProvider>
      </DowngradeFormsContainer>
    </form>
  );
};

export default DowngradeForm;
