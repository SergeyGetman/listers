import React, { FC, useCallback, useRef, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { bindPopover, bindTrigger, usePopupState } from 'material-ui-popup-state/hooks';
import {
  SelectRoleContainer,
  SelectRolePopoverContainer,
  SelectRolePopoverContentContainer,
  SelectRolePopoverContentItem,
  SelectRolePopoverLeftColumnContainer,
  SelectRolePopoverRightColumnContainer,
} from './SelectEmailOrPhoneField.style';
import { capitalizeFirstLetter } from '../../../shared/utils/capitalizeFirstLetter';
import ErrorMessage from '../ErrorMessage';
import InputLabel from '../InputLabel';

type SelectValue = {
  label: string;
  value: string;
};

type Props = {
  leftColumnValue: string;
  rightColumnValue: string;
  label?: string;
  onChange: (value: string) => void;
  onChangeType: (value: string) => void;
  value: string;
  isError?: boolean;
  errorMessage?: string;
  placeholder: string;
  leftColumn: SelectValue[];
  rightColumn: SelectValue[];
};

const SelectEmailOrPhoneField: FC<Props> = ({
  leftColumnValue,
  rightColumnValue,
  label,
  onChange,
  onChangeType,
  value,
  isError,
  errorMessage,
  placeholder,
  leftColumn,
  rightColumn,
}) => {
  const popupState = usePopupState({
    variant: 'popover',
    popupId: 'emojiPopover',
  });

  const theme = useTheme();

  const [selectLeftColumnValue, setSelectLeftColumnValue] = useState<string>(leftColumnValue);
  const [selectRightColumnValue, setSelectRightColumnValue] = useState<string>(rightColumnValue);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectRightColumnValue = useCallback(
    (newValue: string) => {
      setSelectRightColumnValue(newValue);
      onChange(newValue);
      popupState.close();
    },
    [popupState, onChange, setSelectRightColumnValue],
  );

  const handleSelectLeftColumnValue = useCallback(
    (newValue: string) => {
      setSelectLeftColumnValue(newValue);
      onChangeType(newValue);
    },
    [setSelectLeftColumnValue, onChangeType],
  );

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
                width: '20px',
                height: '20px',
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
            height: '166px',
            overflow: 'hidden',
            width: '254px',
          }}
        >
          <SelectRolePopoverContentContainer>
            <SelectRolePopoverLeftColumnContainer>
              {leftColumn?.map((item) => (
                <SelectRolePopoverContentItem
                  isActive={selectLeftColumnValue === item.value}
                  key={item.value}
                  onClick={() => handleSelectLeftColumnValue(item.value)}
                >
                  <Typography sx={{ p: '5px' }} variant="small">
                    {capitalizeFirstLetter(item.label)}
                  </Typography>
                </SelectRolePopoverContentItem>
              ))}
            </SelectRolePopoverLeftColumnContainer>
            <SelectRolePopoverRightColumnContainer>
              {rightColumn?.map((item) => (
                <SelectRolePopoverContentItem
                  isActive={selectRightColumnValue === item.value}
                  key={item.value}
                  onClick={() => handleSelectRightColumnValue(item.value)}
                >
                  <Typography sx={{ p: '5px 0 5px 5px', wordBreak: 'break-all' }} variant="small">
                    {capitalizeFirstLetter(item.label)}
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

export default SelectEmailOrPhoneField;
