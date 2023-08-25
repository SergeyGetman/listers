import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { ReactComponent as todoIcon } from '../../../../../assets/Images/illustrations/To-do.svg';
import { ReactComponent as calendarIcon } from '../../../../../assets/Images/illustrations/Calendar.svg';
import { ReactComponent as starIcon } from '../../../../../assets/Images/illustrations/Star.svg';
import { ReactComponent as contactIcon } from '../../../../../assets/Images/illustrations/Contacts.svg';
import MuiLinkTextButton from '../../../../../components/buttons/MuiLinkTextButton';
import theme from '../../../../../theme/theme';
import router from '../../../../../shared/services/router';
type WelcomeToHubmeeStepProps = {
  userName?: string;
};
const WelcomeToHubmeeStep: FC<WelcomeToHubmeeStepProps> = ({ userName }) => {
  const navigate = useNavigate();
  // TODO temporary solution
  const testArr = [
    {
      id: '1',
      title: 'Checklist or note',
      description: 'Stay organized',
      icon: todoIcon,
      to: router.todo.path,
    },
    {
      id: '2',
      title: 'Task or event',
      description: 'Track with ease',
      icon: calendarIcon,
      to: router.calendar.path,
    },
    {
      id: '3',
      title: 'Hubs',
      description: 'Effortless access',
      icon: starIcon,
      to: `${router.settings.path}/${router.settings.children.hubs.path}`,
    },
    {
      id: '4',
      title: 'Network',
      description: 'Build your connection',
      icon: contactIcon,
      to: router.network.path,
    },
  ];
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: '48px', md: '173px', lg: '138px' },

        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: '743px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: { xs: '0 16px', sm: '0' },
        }}
      >
        <Typography
          fontWeight={500}
          variant="h1"
          sx={{ textAlign: { xs: 'start', sm: 'center' }, mb: { xs: '4px', sm: '9px' }, color: '#1F243B' }}
        >
          Hello, {userName}!
        </Typography>
        <Typography
          fontWeight={500}
          variant="h3"
          sx={{ textAlign: { xs: 'start', sm: 'center' }, mb: { xs: '56px', sm: '48px' }, color: '#2B324F' }}
        >
          Welcome to{' '}
          <Box component="span" sx={{ color: '#3AA625' }}>
            hubmee
          </Box>{' '}
          family
        </Typography>
        <Typography variant="bodySmall" sx={{ textAlign: { xs: 'start', sm: 'center', color: '#5A6384' } }}>
          What would you like to explore first
        </Typography>

        <Box
          sx={{
            mt: '12px',
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            '@media (max-width: 732px)': { justifyContent: 'center' },
          }}
        >
          {testArr.map((item) => (
            <Box
              key={item.id}
              onClick={() => navigate(item.to)}
              sx={{
                p: '12px',
                m: { xs: '6px 0', sm: '12px 12px' },
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                width: { xs: '100%', sm: '343px' },
                height: '72px',
                border: '1px solid #D9DDEC',
                borderRadius: '5px',
                '&:hover': {
                  cursor: 'pointer',
                  opacity: '0.7',
                },
              }}
            >
              <item.icon />
              <Box sx={{ ml: '10px', display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ color: '#5A6384' }} variant="subheader2">
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#8F95B2' }} variant="bodySmall">
                  {item.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            mt: { xs: '10px', sm: '12px' },
            display: 'flex',
            justifyContent: 'flex-end',
            pr: { xs: '0', sm: '24px' },
          }}
        >
          <MuiLinkTextButton
            sx={{ color: theme.palette.case.primary.p600 }}
            onClick={() => navigate(router.todo.path)}
            label="Skip"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WelcomeToHubmeeStep;
