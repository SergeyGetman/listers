import { Box, CircularProgress } from '@mui/material';
import React, { FC } from 'react';
import useFixFileName from '../../../../shared/hooks/useFixFileName';
import { MediaType } from '../../../../shared/models/media.model';

import { ChatInputFileName } from '../ChatForm.style';

type Props = {
  item: MediaType;
  showFile: () => void;
};

const ChatInputFileElement: FC<Props> = ({ item, showFile }) => {
  const { fixFileName } = useFixFileName();

  return (
    <Box
      sx={{
        position: 'relative',
        width: '63px',
      }}
    >
      <Box onClick={() => !!item.progress === false && showFile()}>
        <ChatInputFileName isLoading={!!item.progress} variant="small">
          {fixFileName(item.original_filename, 5, '.')}
        </ChatInputFileName>
      </Box>
      {item.progress && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress variant="determinate" size="15px" value={item.progress} />
        </Box>
      )}
    </Box>
  );
};

export default ChatInputFileElement;
