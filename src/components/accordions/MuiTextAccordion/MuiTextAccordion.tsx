import { Box, Collapse, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { MuiTextAccordionContainer } from './MuiTextAccordion.style';

type Props = {
  title: string;
  text?: string;
  textComponent?: React.ReactNode;
};

const MuiTextAccordion: FC<Props> = ({ title, text, textComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MuiTextAccordionContainer onClick={() => setIsOpen((prev) => !prev)}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <Typography variant="small">{title}</Typography>
        <Box
          sx={{
            width: '20px',
            height: '20px',
            marginRight: '5px',
          }}
        >
          <KeyboardArrowDownIcon sx={{ transform: isOpen ? 'rotate(180deg)' : '', transition: '0.3s' }} />
        </Box>
      </Box>
      <Collapse unmountOnExit in={isOpen}>
        <Box sx={{ pr: '25px', pt: '10px' }}>
          {textComponent ? (
            textComponent
          ) : (
            <Typography variant="small" sx={(theme) => ({ color: theme.palette.case.neutral.n700 })}>
              {text}
            </Typography>
          )}
        </Box>
      </Collapse>
    </MuiTextAccordionContainer>
  );
};

export default MuiTextAccordion;
