import React, { FC, useMemo } from 'react';

import { ReactComponent as ArrowLeftIcon } from '../../../assets/Images/modalNavigation/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../assets/Images/modalNavigation/arrow-right.svg';
import { ReactComponent as ArrowBottomIcon } from '../../../assets/Images/modalNavigation/arrow-bottom.svg';
import { ReactComponent as CloseIcon } from '../../../assets/Images/modalNavigation/close.svg';
import { ReactComponent as ReplyIcon } from '../../../assets/Images/reply.svg';
import { ReactComponent as ExitIcon } from '../../../assets/Images/modalNavigation/exit.svg';
import { NavigationBtn, NavigationButtonBadge } from './NavigationButton.style';

type NavigationButtonProps = {
  type?: 'back' | 'close' | 'next' | 'bottom' | 'reply' | 'exit';
  size?: 'large' | 'medium' | 'small';
  isDisabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  count?: number;
  background?: string;
};

const NavigationButton: FC<NavigationButtonProps> = ({
  type = 'close',
  size = 'large',
  background,
  isDisabled,
  count = 0,
  onClick,
  icon,
}) => {
  const choseSize = useMemo(() => {
    switch (type) {
      case 'back': {
        return <ArrowLeftIcon />;
      }
      case 'close': {
        return <CloseIcon />;
      }
      case 'exit': {
        return <ExitIcon />;
      }
      case 'next': {
        return <ArrowRightIcon />;
      }
      case 'bottom': {
        return <ArrowBottomIcon />;
      }
      case 'reply': {
        return <ReplyIcon />;
      }
      default: {
        return null;
      }
    }
  }, [type]);

  return (
    <>
      {count === 0 ? (
        <NavigationBtn background={background} size={size} onClick={onClick} disabled={isDisabled}>
          {icon || choseSize}
        </NavigationBtn>
      ) : (
        <NavigationButtonBadge color="error" badgeContent={count} invisible={!count}>
          <NavigationBtn background={background} size={size} onClick={onClick} disabled={isDisabled}>
            {icon || choseSize}
          </NavigationBtn>
        </NavigationButtonBadge>
      )}
    </>
  );
};

export default NavigationButton;
