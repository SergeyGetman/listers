import React, { FC } from 'react';
import { Box, Link, Typography, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

type Props = {
  title?: string;
  link?: string;
  description?: { paragraph: string }[];
  listTitle?: string;
  list?: { listItem: string }[];
};

const PolicyModalBlock: FC<Props> = ({ title, link, description, listTitle, list }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="large_bolt" sx={{ mt: '10px' }}>
        {title}
      </Typography>
      <Typography variant="default">{listTitle}</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {list?.map((item) => (
          <Box sx={{ display: 'flex', paddingLeft: '10px', alignItems: 'flex-start' }}>
            <Box sx={{ pt: '4px' }}>
              <FiberManualRecordIcon sx={{ mr: '10px', width: '5px', height: '5px' }} />
            </Box>
            <Box>
              <Typography variant="default" sx={{ mt: '0' }}>
                {item.listItem}
              </Typography>
            </Box>
          </Box>
        ))}
        <Link
          href="mailto:support@hubmee.com"
          variant="default"
          sx={{ color: theme.palette.case.main.blue.high }}
        >
          {link}
        </Link>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {description?.map((item) => (
          <Typography variant="default" sx={{ mb: '10px' }}>
            {item.paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};
export default PolicyModalBlock;
