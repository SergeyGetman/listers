import React from 'react';
import StubWithCreateVariants from '../../../../components/stubs/StubWithCreateVariants';
import { useCreateBestWay } from '../../hooks/useCreateBestWay';
import { PageStubContainer } from '../../../../shared/styles/StubContainer';

const PreStepBestWayAdd = () => {
  const { t, BastWayList } = useCreateBestWay();

  return (
    <PageStubContainer>
      <StubWithCreateVariants
        createItemList={BastWayList}
        label={t('stubs.garage.preStep.bestWay.title')}
        newLabel={null}
        version="v2"
      />
    </PageStubContainer>
  );
};
export default PreStepBestWayAdd;
