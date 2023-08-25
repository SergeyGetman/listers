import { createContext, useContext } from 'react';

interface SelectContextData {
  isShowAvatarInOptions: boolean;
}

const defaultContextProps: SelectContextData = {
  isShowAvatarInOptions: false,
};

const selectContext = createContext<SelectContextData>(defaultContextProps);

export const SelectContextProvider = selectContext.Provider;

export function useSelectContext() {
  return useContext(selectContext);
}
