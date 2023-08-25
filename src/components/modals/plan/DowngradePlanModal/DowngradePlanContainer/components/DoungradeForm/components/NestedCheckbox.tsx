import { Controller, useFormContext } from 'react-hook-form';
import MuiCheckbox from '../../../../../../../formElements/MuiCheckbox';
import { planFormText } from '../config';

type Props = {
  name: keyof typeof planFormText;
};

const NestedCheckbox = ({ name }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => <MuiCheckbox {...field} label={planFormText[name]} />}
    />
  );
};

export default NestedCheckbox;
