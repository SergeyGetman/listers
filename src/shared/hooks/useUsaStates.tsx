import { useCallback, useMemo } from 'react';
import { usaStatesWithCounties } from 'typed-usa-states';
import { IUSAState } from 'typed-usa-states/dist/typings';
import { OptionType } from '../../components/formElements/MuiSelect/MuiSelect';

const useUsaStates = () => {
  const statesWithCounties: OptionType[] = useMemo(() => {
    return usaStatesWithCounties.map((item: IUSAState) => ({
      label: item.name,
      value: item.name,
    }));
  }, []);

  const getCounty = useCallback((state: string): OptionType[] => {
    return (
      usaStatesWithCounties
        .find((item: IUSAState) => item.name === state)
        ?.counties?.map((item: string) => ({ label: item, value: item })) || []
    );
  }, []);

  return { statesWithCounties, getCounty };
};

export default useUsaStates;
