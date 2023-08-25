import { ModalNamesEnum } from '../../enums/modalNames.enum';
import createSubscription, { Subscription } from '../../functions/createSubscription';

type MapProxy = Record<ModalNamesEnum, any>;

export type ModalProps = {
  isOpen?: boolean;
  props?: { [key: string]: any };
};
interface ModalObserver extends Subscription {
  addModal(key: ModalNamesEnum, payload: ModalProps): void;
  openModal(key: ModalNamesEnum): void;
  removeModal(key: ModalNamesEnum): void;
  removeAllModals(): void;
  closeModal(key: ModalNamesEnum): void;
  closeAllModals(): void;
  replaceModalProps(key: ModalNamesEnum, payload: ModalProps): void;
  updateModalProps(key: ModalNamesEnum, payload: ModalProps): void;
  findModal(key: ModalNamesEnum): any;
}

function modalObserver(): ModalObserver {
  const { emit, subscribe, unsubscribe } = createSubscription();

  const mapper: MapProxy = new Proxy({} as MapProxy, {
    set(target: MapProxy, key: ModalNamesEnum, props) {
      target[key] = props;
      emit({ key, props });

      return true;
    },
  });

  const addModal: ModalObserver['addModal'] = (key, payload) => {
    mapper[key] = { ...payload, isOpen: true };
  };

  const openModal: ModalObserver['openModal'] = (key) => {
    const current = mapper[key];
    mapper[key] = { ...current, isOpen: true };
  };

  const removeModal: ModalObserver['removeModal'] = (key) => {
    mapper[key] = undefined;
  };

  const removeAllModals: ModalObserver['removeAllModals'] = () => {
    Object.keys(mapper).forEach((key) => {
      mapper[key as ModalNamesEnum] = undefined;
    });
  };

  const closeModal: ModalObserver['closeModal'] = (key) => {
    const current = mapper[key];
    mapper[key] = { ...current, isOpen: false };
  };

  const closeAllModals: ModalObserver['closeAllModals'] = () => {
    Object.keys(mapper).forEach((key) => {
      const current = mapper[key as ModalNamesEnum];
      if (current?.isOpen) {
        mapper[key as ModalNamesEnum] = { ...current, isOpen: false };
      }
    });
  };

  const updateModalProps: ModalObserver['updateModalProps'] = (key, payload) => {
    const current = mapper[key];
    mapper[key] = { ...current, props: { ...current?.props, ...payload?.props } };
  };

  const replaceModalProps: ModalObserver['replaceModalProps'] = (key, payload) => {
    const current = mapper[key];
    mapper[key] = { ...current, props: payload };
  };

  const findModal: ModalObserver['findModal'] = (key) => {
    return mapper[key];
  };

  return {
    addModal,
    openModal,
    removeModal,
    removeAllModals,
    closeModal,
    closeAllModals,
    updateModalProps,
    replaceModalProps,
    findModal,
    subscribe,
    unsubscribe,
    emit,
  };
}

export default modalObserver();
