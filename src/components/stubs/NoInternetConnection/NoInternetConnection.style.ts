import { StyledComponent } from '@emotion/styled';
import { SvgIcon, styled } from '@mui/material';

const IconWrapper: StyledComponent<any> = styled(SvgIcon)`
  width: 180px;
  height: 180px;

  @media (max-width: 380px) {
    width: 106px;
    height: 106px;
  }
`;

export default IconWrapper;
