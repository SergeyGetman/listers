import { FC } from 'react';
import { Skeleton as SkeletonMUI, SxProps, Theme } from '@mui/material';

type PropsType = {
  height: string;
  sx?: SxProps<Theme>;
};

export const Skeleton: FC<PropsType> = ({ height, sx }) => {
  return <SkeletonMUI sx={{ borderRadius: '8px', height: height, ...sx }} variant="rectangular" />;
};
