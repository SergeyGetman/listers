import { Palette } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import React from 'react';

const typography: TypographyOptions | ((palette: Palette) => TypographyOptions) = {
  fontSize: 12,
  fontFamily: 'Archivo, sans-serif',
  h1: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '32px',
    lineHeight: '42px',
  },
  h2: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '36px',
  },
  h3: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '28px',
  },

  s1: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '26px',
  },

  s2: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
  },
  s3: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  t16r: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
  },
  t16m: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
  },
  t14r: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '19px',
  },
  t14m: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  t12r: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  },
  t12m: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
  },
  t10m: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '16px',
  },
  button1: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.032px',
  },
  button2: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    letterSpacing: '0.028px',
  },
  // TODO DEPRECATED - DO NOT USE
  subheader1: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '24px',
  },
  subheader2: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
  },
  subheader3: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  body: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
  },
  bodyBold: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '22px',
  },
  bodySmall: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
  },
  bodySmallBold: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '20px',
  },
  button: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '22px',
  },
  badge: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '16px',
  },
  badgeMedium: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '16px',
  },

  subtitle1: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '18px',
    lineHeight: '24px',
  },
  extra_large_bolt: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'uppercase',
  },
  extra_large: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    textTransform: 'uppercase',
  },
  large_bolt: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '24px',
  },
  large: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
  },
  default_bolt: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
  },
  default: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '20px',
  },
  small_bolt: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '13px',
    lineHeight: '19px',
  },
  small_large: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '13px',
    lineHeight: '19px',
    textTransform: 'uppercase',
  },
  small: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '19px',
  },

  extra_small_bolt: {
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '11px',
    lineHeight: '16px',
  },
  extra_small: {
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '11px',
    lineHeight: '16px',
  },
  label: {
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: '10px',
    lineHeight: '10px',
  },
  label_bolt: {
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: '10px',
    lineHeight: '10px',
  },

  label_middle: {
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '12px',
  },
};

declare module '@mui/material/styles' {
  interface TypographyVariants {
    h3: React.CSSProperties;
    s1: React.CSSProperties;
    s2: React.CSSProperties;
    s3: React.CSSProperties;
    t16r: React.CSSProperties;
    t16m: React.CSSProperties;
    t14r: React.CSSProperties;
    t14m: React.CSSProperties;
    t12r: React.CSSProperties;
    t12m: React.CSSProperties;
    t10m: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;

    // TODO DEPRECATED - DO NOT USE
    subheader1: React.CSSProperties;
    subheader2: React.CSSProperties;
    subheader3: React.CSSProperties;
    body: React.CSSProperties;
    bodyBold: React.CSSProperties;
    bodySmall: React.CSSProperties;
    bodySmallBold: React.CSSProperties;
    button: React.CSSProperties;
    badge: React.CSSProperties;
    badgeMedium: React.CSSProperties;
    extra_large: React.CSSProperties;
    extra_large_bolt: React.CSSProperties;
    large_bolt: React.CSSProperties;
    large: React.CSSProperties;
    default_bolt: React.CSSProperties;
    default: React.CSSProperties;
    small_bolt: React.CSSProperties;
    small: React.CSSProperties;
    extra_small_bolt: React.CSSProperties;
    extra_small: React.CSSProperties;
    label: React.CSSProperties;
    label_middle: React.CSSProperties;
    small_large: React.CSSProperties;
    label_bolt: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    h3: React.CSSProperties;
    s1: React.CSSProperties;
    s2: React.CSSProperties;
    s3: React.CSSProperties;
    t16r: React.CSSProperties;
    t16m: React.CSSProperties;
    t14r: React.CSSProperties;
    t14m: React.CSSProperties;
    t12r: React.CSSProperties;
    t12m: React.CSSProperties;
    t10m: React.CSSProperties;
    button1: React.CSSProperties;
    button2: React.CSSProperties;

    // TODO DEPRECATED - DO NOT USE
    subheader1: React.CSSProperties;
    subheader2: React.CSSProperties;
    subheader3: React.CSSProperties;
    body: React.CSSProperties;
    bodyBold: React.CSSProperties;
    bodySmall: React.CSSProperties;
    bodySmallBold: React.CSSProperties;
    button: React.CSSProperties;
    badge: React.CSSProperties;
    badgeMedium: React.CSSProperties;
    extra_large: React.CSSProperties;
    extra_large_bolt: React.CSSProperties;
    large_bolt: React.CSSProperties;
    large: React.CSSProperties;
    default_bolt: React.CSSProperties;
    default: React.CSSProperties;
    small_bolt: React.CSSProperties;
    small: React.CSSProperties;
    extra_small_bolt: React.CSSProperties;
    extra_small: React.CSSProperties;
    label: React.CSSProperties;
    label_middle: React.CSSProperties;
    small_large: React.CSSProperties;
    label_bolt: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h3: true;
    s1: true;
    s2: true;
    s3: true;
    t16r: true;
    t16m: true;
    t14r: true;
    t14m: true;
    t12r: true;
    t12m: true;
    t10m: true;
    button1: true;
    button2: true;
    subheader1: true;
    subheader2: true;
    subheader3: true;
    body: true;
    bodyBold: true;
    bodySmall: true;
    bodySmallBold: true;
    button: true;
    badge: true;
    badgeMedium: true;
    // TODO DEPRECATED - DO NOT USE
    small1: true;
    extra_large: true;
    extra_large_bolt: true;
    large_bolt: true;
    large: true;
    default_bolt: true;
    default: true;
    small_bolt: true;
    small: true;
    extra_small_bolt: true;
    extra_small: true;
    label: true;
    label_middle: true;
    small_large: true;
    label_bolt: true;
  }
}

export default typography;
