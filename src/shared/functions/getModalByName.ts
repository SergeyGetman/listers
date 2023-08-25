import modalObserver from '../utils/observers/modalObserver';
import { ModalNamesEnum } from '../enums/modalNames.enum';

export const getModalByName = (name: ModalNamesEnum) => {
  return modalObserver.findModal(name);
};
