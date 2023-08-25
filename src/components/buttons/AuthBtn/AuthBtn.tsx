import React, { FC } from 'react';
import MuiLoadingButton from '../MuiLoadingButton';
type AuthBtnProps = {
  label: string;
  type?: 'button' | 'reset' | 'submit';
  isStopPropagation?: boolean;
  onClick?: (event: React.MouseEvent<any, MouseEvent>) => void;
  loading?: boolean;
  [x: string]: any;
};
// Styles from typography
const AuthBtn: FC<AuthBtnProps> = ({
  label,
  type = 'button',
  onClick,
  isStopPropagation,
  loading,
  ...args
}) => {
  return (
    <MuiLoadingButton
      size="small"
      loading={loading}
      variant="contained"
      sx={{
        width: '100%',
        fontSize: '14px',
        fontWeight: 500,
        height: '38px',
        borderRadius: '4px',
      }}
      onClick={onClick}
      label={label}
      type={type}
      isStopPropagation={isStopPropagation}
      {...args}
    />
  );
};

export default AuthBtn;
