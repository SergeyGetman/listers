import { useEffect, useState, memo, Suspense } from 'react';
import modalObserver from '../../../shared/utils/observers/modalObserver';
import modalsMap from '../../../shared/utils/modalsMap';
import { ModalNamesEnum } from '../../../shared/enums/modalNames.enum';

const RootModal = () => {
  const [modalsForShow, setModalsForShow] = useState(modalsMap);

  const handler = ({ key, props }: { key: ModalNamesEnum; props: any }) => {
    setModalsForShow((prev) => ({ ...prev, [key]: { component: modalsMap[key], props } }));
  };

  useEffect(() => {
    modalObserver.subscribe(handler);

    return () => {
      modalObserver.unsubscribe(handler);
    };
  }, []);

  return (
    <>
      {Object.entries(modalsForShow)?.map(([key, { component: Component, props }]) => {
        if (!Component) {
          return null;
        }

        return (
          <Suspense key={key}>
            <Component {...props} />
          </Suspense>
        );
      })}
    </>
  );
};

export default memo(RootModal);
