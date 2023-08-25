import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Box, Skeleton, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
  SelectRoleContainer,
  SelectRolePopoverContainer,
  SelectRolePopoverContentContainer,
  SelectRolePopoverContentItem,
  SelectRolePopoverLeftColumnContainer,
  SelectRolePopoverRightColumnContainer,
  SelectRolePopoverSkeletonContainer,
} from './SelectRole.style';
import { useAppDispatch } from '../../../shared/hooks/redux';
import { getRoles } from '../../../store/network/networkThunk';
import { capitalizeFirstLetter } from '../../../shared/utils/capitalizeFirstLetter';
import ErrorMessage from '../ErrorMessage';
import InputLabel from '../InputLabel';

type Props = {
  label?: string;
  onChange: (value: string) => void;
  value: string;
  isError?: boolean;
  errorMessage?: string;
  placeholder: string;
};

const SelectRole: FC<Props> = ({ label, onChange, value, isError, errorMessage, placeholder }) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'emojiPopover',
  });

  const [groupRoleLoading, setGroupRoleLoading] = useState(false);
  const [groupRole, setGroupRole] = useState<string[]>([]);
  const theme = useTheme();
  // TODO eny
  const [roles, setRoles] = useState<{ [key: string]: string[] } | any | {}>({});
  const [itemRole, setItemRole] = useState<string[]>([]);
  const [selectGroupRole, setSelectGroupRole] = useState<string>();
  const [selectItemRole, setSelectItemRole] = useState<string>('friend');
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleSelectItemRole = (selectValue: string) => {
    onChange(selectValue);
    setSelectItemRole(value);
    popupState.close();
  };

  const selectGroup = (data: { [key: string]: string[] } | any | {}) => {
    setGroupRole(Object.keys(data));
    setSelectGroupRole(Object.keys(data)[0]);
    setItemRole(data.friend);
  };

  const handleSelectGroup = useCallback(
    (selectValue: string) => {
      setSelectGroupRole(selectValue);
      setItemRole(roles[selectValue]);
    },
    [setSelectGroupRole, roles],
  );

  useEffect(() => {
    if (popupState?.isOpen) {
      dispatch(getRoles(setGroupRoleLoading, setRoles, selectGroup));
    } else {
      setGroupRole([]);
      setItemRole([]);
      setSelectItemRole('');
      setSelectGroupRole('');
    }
    return () => {
      setGroupRole([]);
      setItemRole([]);
    };
  }, [dispatch, popupState, setSelectGroupRole, setSelectItemRole]);

  const skeletonArray = Array(3).fill('');
  const skeletonArray2 = Array(5).fill('');
  const themed = useTheme();

  const isSmallDisplay = useMediaQuery(themed.breakpoints.down('sm'));
  return (
    <Box>
      <Box>
        <InputLabel label={label} />
        <SelectRoleContainer
          ref={ref}
          {...bindTrigger(popupState)}
          isError={isError}
          isHasValue={!!value}
          isOpened={popupState?.isOpen}
        >
          {value ? (
            <Typography>{value}</Typography>
          ) : (
            <Typography sx={{ color: theme.palette.case.neutral.n400 }}>{placeholder}</Typography>
          )}

          <Box
            sx={{
              width: '20px',
              height: '20px',
              svg: {
                width: 20,
                height: 20,
              },
            }}
          >
            {popupState.isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Box>
        </SelectRoleContainer>
        <ErrorMessage isShow={isError} message={errorMessage} />
      </Box>

      <SelectRolePopoverContainer
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        {...bindPopover(popupState)}
      >
        <Box
          sx={{
            height: '227px',
            overflow: 'hidden',
            width: isSmallDisplay ? '250px' : '300px',
          }}
        >
          <SelectRolePopoverContentContainer>
            <SelectRolePopoverLeftColumnContainer>
              {groupRoleLoading
                ? skeletonArray.map((_, index) => (
                    <SelectRolePopoverSkeletonContainer key={index}>
                      <Skeleton variant="rectangular" height={29} width="65" sx={{ borderRadius: '5px' }} />
                    </SelectRolePopoverSkeletonContainer>
                  ))
                : groupRole?.map((item) => (
                    <SelectRolePopoverContentItem
                      isActive={selectGroupRole === item}
                      key={item}
                      onClick={() => handleSelectGroup(item)}
                    >
                      <Typography sx={{ p: '5px 5px 5px 5px' }} variant="small">
                        {capitalizeFirstLetter(item)}
                      </Typography>
                    </SelectRolePopoverContentItem>
                  ))}
            </SelectRolePopoverLeftColumnContainer>
            <SelectRolePopoverRightColumnContainer>
              {groupRoleLoading
                ? skeletonArray2.map((_, index) => (
                    <SelectRolePopoverSkeletonContainer key={index}>
                      <Skeleton variant="rectangular" height={29} width="100%" sx={{ borderRadius: '5px' }} />
                    </SelectRolePopoverSkeletonContainer>
                  ))
                : !!itemRole.length &&
                  itemRole?.map((item) => (
                    <SelectRolePopoverContentItem
                      isActive={selectItemRole === item}
                      key={item}
                      onClick={() => handleSelectItemRole(item)}
                    >
                      <Typography sx={{ p: '5px 0 5px 5px', wordBreak: 'break-all' }} variant="small">
                        {item}
                      </Typography>
                    </SelectRolePopoverContentItem>
                  ))}
            </SelectRolePopoverRightColumnContainer>
          </SelectRolePopoverContentContainer>
        </Box>
      </SelectRolePopoverContainer>
    </Box>
  );
};

export default SelectRole;
