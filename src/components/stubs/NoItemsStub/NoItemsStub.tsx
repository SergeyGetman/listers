import React, { FC } from 'react';
import { useMediaQuery, useTheme, Box } from '@mui/material';
import {
  ImageMobileContainer,
  StubContainer,
  TitleContainer,
  FirstTextWrap,
  SecondTextWrap,
  ImageContainer,
} from './NoItemsStub.style';
import { AddBottomButtonContainer } from '../../../shared/styles/AddBottomButtonContainer';
import CircularButton from '../../buttons/CilrcularButton';

type ValueProps = {
  title: string;
  description?: string;
  img: string;
  imageAlt?: string;
};

type Props = {
  value: ValueProps;
  handleAddItem?: () => void;
};

const NoItemsStub: FC<Props> = ({ value, handleAddItem }) => {
  const theme = useTheme();
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobileDisplay ? (
    <StubContainer>
      <ImageMobileContainer>
        <img src={value.img} alt={value.imageAlt} width="100%" />
      </ImageMobileContainer>

      <TitleContainer>
        <FirstTextWrap variant="large">{value.title}</FirstTextWrap>
      </TitleContainer>
      {handleAddItem ? (
        <AddBottomButtonContainer>
          <CircularButton size="large" onClick={handleAddItem} />
        </AddBottomButtonContainer>
      ) : (
        <></>
      )}
    </StubContainer>
  ) : (
    <Box sx={{ textAlign: 'center' }}>
      <ImageContainer>
        <img src={value.img} alt={value.imageAlt} width="100%" />
      </ImageContainer>

      <Box sx={{ m: '24px 0 6px 0' }}>
        <FirstTextWrap variant="h3">{value.title}</FirstTextWrap>
      </Box>

      <SecondTextWrap variant="large">{value.description}</SecondTextWrap>
    </Box>
  );
};

export default NoItemsStub;
