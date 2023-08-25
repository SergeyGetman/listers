import React, { FC } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { parsePhoneNumber } from 'react-phone-number-input';
import { toUpper } from 'lodash';
import CopyButton from '../../buttons/CopyButton';
import { ReactComponent as PhoneIcon } from '../../../assets/Images/phone-icon.svg';

type MuiPhoneNumberInputViewProps = {
  content: string;
  country?: string;
  isShowCopyBtn?: boolean;
  isShowPhoneIcon?: boolean;
};

export const codeToFlag = (code: string): string =>
  String.fromCodePoint(
    ...toUpper(code)
      .split('')
      .map((c) => 127397 + c.charCodeAt(0)),
  );

const MuiPhoneNumberInputView: FC<MuiPhoneNumberInputViewProps> = ({
  content = '',
  country,
  isShowCopyBtn = true,
  isShowPhoneIcon,
}) => {
  const formatCountry = country ? country : parsePhoneNumber(content)?.country;
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {isShowPhoneIcon && (
        <Box
          sx={{
            svg: { width: '16px', height: '16px', path: { fill: theme.palette.case.neutral.n500 } },
            mr: '6px',
          }}
        >
          <PhoneIcon />
        </Box>
      )}

      {codeToFlag(formatCountry || 'US')}
      <Typography
        ml="6px"
        mr={isShowCopyBtn ? '12px' : '0'}
        sx={{ a: { color: `${theme.palette.case.blue.b800} !important` } }}
        variant="t14r"
      >
        <a href={`tel:${content}`}>{content}</a>
      </Typography>
      {isShowCopyBtn && <CopyButton content={content} />}
    </Box>
  );
};

export default MuiPhoneNumberInputView;
