import { Box, Button, Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckIcon from '@mui/icons-material/Check';

export type PlanCardType = {
  title: string;
  label: string;
  price: number;
  features: string[];
  isActive: boolean;
  icon: () => JSX.Element;
  handleSubmit: () => void;
};
const screenWidth = 400;
const PlanCard = ({ title, price, label, features, isActive, icon: Icon, handleSubmit }: PlanCardType) => {
  const theme = useTheme();
  const isScreenWidth400 = useMediaQuery(`(max-width: ${screenWidth}px)`);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: isScreenWidth400 ? '600px' : { sm: '440px', xs: '530px' },
        cursor: 'pointer',
        maxHeight: '700px',
        pb: { xs: '50px', sm: '0' },
      }}
      onClick={handleSubmit}
    >
      <Typography
        textAlign="center"
        variant="body"
        sx={{ whiteSpace: 'pre-wrap', marginBottom: '8px', color: theme.palette.case.neutral.n700 }}
      >
        {t(label)}
      </Typography>
      <Card
        elevation={2}
        sx={{
          padding: '16px',
          paddingBottom: '60px',
          position: 'relative',
          flex: 1,
          outline: isActive ? `1px solid ${theme.palette.case.primary.p700}` : 'none',
          boxShadow: '0px 4px 16px rgba(38, 44, 74, 0.08)',
          overflow: 'visible',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Icon />
        </Box>
        <Typography variant="h1" textAlign="center" sx={{ lineHeight: '50px' }}>
          {title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            color: theme.palette.case.primary.p600,
          }}
        >
          <Typography lineHeight="30px" variant="h3">
            ${price}
          </Typography>
          <Typography variant="body" textTransform="lowercase">
            /{t('general.actionMenus.month')}
          </Typography>
        </Box>
        <Typography
          textAlign="center"
          textTransform="lowercase"
          sx={{ color: theme.palette.case.neutral.n500, marginBottom: '8px', lineHeight: '20px' }}
        >
          ${Number.isInteger(price / 30) ? price / 30 : (price / 30).toFixed(2)}/
          {t('general.actionMenus.day')}
        </Typography>
        <div>
          {features.map((feature) => (
            <Box
              sx={{ display: 'flex', color: theme.palette.case.neutral.n700, marginBottom: '4px' }}
              key={feature}
            >
              <CheckIcon sx={{ marginRight: '12px', color: theme.palette.case.neutral.n500 }} />{' '}
              <Typography>{t(feature)}</Typography>
            </Box>
          ))}
        </div>
        <Button
          color="secondary"
          disabled
          sx={{
            left: 0,
            right: 0,
            bottom: 0,
            height: 48,
            position: 'absolute',
            borderRadius: '0 0px 5px 5px',
            color: `${theme.palette.case.neutral.n700} !important`,
            backgroundColor: theme.palette.case.neutral.n100,
          }}
        >
          {t('plans.button.choose')}
        </Button>
      </Card>
    </Box>
  );
};

export default PlanCard;
