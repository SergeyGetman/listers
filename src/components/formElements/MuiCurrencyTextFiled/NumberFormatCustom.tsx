import React, { forwardRef } from 'react';

import { NumberFormatValues, NumericFormat } from 'react-number-format';
type NumberFormatCustomProps = {
  onChange: (event: { target: { value: number | null } }) => void;
  [x: string]: any;
};

// eslint-disable-next-line
const NumberFormatCustom = forwardRef<HTMLHeadingElement, NumberFormatCustomProps>((props, ref) => {
  const { onChange, ...args } = props;

  return (
    <NumericFormat
      {...args}
      onValueChange={(value: NumberFormatValues) => {
        onChange({
          target: {
            value: value.floatValue === 0 ? 0 : value.floatValue ? value.floatValue * 100 : null,
          },
        });
      }}
      decimalScale={2}
      thousandsGroupStyle="thousand"
      thousandSeparator=","
      decimalSeparator="."
    />
  );
});

export default NumberFormatCustom;
