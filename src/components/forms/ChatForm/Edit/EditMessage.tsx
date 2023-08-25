import { Box, Typography } from '@mui/material';
import React, { FC } from 'react';
import { TypographyWithDots } from '../../../../shared/styles/TypographyWithDots';
import NavigationButton from '../../../buttons/NavigationButton';
import { EditMessageContainer } from './EditMessage.style';

type Props = {
  message?: string;
  closeEdit?: () => void;
};

const EditMessage: FC<Props> = ({ message = '', closeEdit }) => {
  return (
    <EditMessageContainer>
      <Box
        sx={(theme) => ({
          pr: '10px',
          borderRight: `1px solid ${theme.palette.case.neutral.n400}`,
        })}
      >
        <NavigationButton size="small" type="close" onClick={closeEdit} />
      </Box>
      <Box
        sx={{
          padding: '0 10px',
        }}
      >
        <Box>
          <Typography sx={(theme) => ({ color: theme.palette.case.neutral.n400 })} variant="extra_small_bolt">
            Edit Message
          </Typography>
        </Box>
        <Box>
          <TypographyWithDots lines={2} variant="extra_small">
            {message}
          </TypographyWithDots>
        </Box>
      </Box>
    </EditMessageContainer>
  );
};

export default EditMessage;
