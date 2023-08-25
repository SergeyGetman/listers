import { useEffect, useState, useCallback } from 'react';
import modalObserver, { ModalProps } from '../utils/observers/modalObserver';
import { ModalNamesEnum } from '../enums/modalNames.enum';

const useModal = (modalName: ModalNamesEnum) => {
  const [modal, setModal] = useState<ModalProps>({} as ModalProps);

  const handler = useCallback(
    ({ key, props }: any) => {
      if (key === modalName) {
        setModal(props);
      }
    },
    [modalName],
  );

  useEffect(() => {
    modalObserver.subscribe(handler);

    return () => modalObserver.unsubscribe(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return modal;
};

export default useModal;
