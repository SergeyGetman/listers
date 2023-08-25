import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { InputBaseComponentProps } from '@mui/material/InputBase';

const StripeInput = React.forwardRef<any, InputBaseComponentProps>(function StripeInput(props, ref) {
  // eslint-disable-next-line react/prop-types
  const { component: Component, options, ...other } = props;
  const theme = useTheme();
  const [mountNode, setMountNode] = React.useState<any | null>(null);

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => mountNode.focus(),
    }),
    [mountNode],
  );

  return (
    <Component
      onReady={setMountNode}
      options={{
        ...options,
        style: {
          base: {
            fontSize: '14px',
            color: theme.typography.default.color,
            lineHeight: '19px',
            fontWeight: 300,
            fontFamily: theme.typography.fontFamily,
            fontStyle: 'normal',
            '::placeholder': {
              color: theme.palette.case.neutral.n400,
              fontSize: '14px',
              lineHeight: '19px',
              fontWeight: 300,
              fontFamily: theme.typography.fontFamily,
            },
          },
        },
      }}
      {...other}
    />
  );
});

export default StripeInput;
