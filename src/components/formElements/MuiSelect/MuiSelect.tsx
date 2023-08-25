import { Box } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import Select, { ActionMeta } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactSelectStartIconContainer, setSelectStyle } from './MuiSelect.style';
import ErrorMessage from '../ErrorMessage';
import theme from '../../../theme/theme';
import { ClearIndicator } from './ClearIndicator';
import { DropdownIndicator } from './DropdownIndicator';
import { Option } from './Option';
import { SelectContextProvider } from './SelectContext';
import { OptionType } from './types';
import InputLabel from '../InputLabel';
export type { OptionType } from './types';

type MuiSelectProps = {
  label?: string;
  options: OptionType[] | any;
  value?: OptionType[] | any;
  size?: 'small' | 'medium';
  placeholder?: string;
  isError?: boolean;
  helpText?: string;
  isRequired?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  getAsyncData?: () => void;
  clearAsyncData?: () => void;
  isLoading?: boolean;
  isMulti?: boolean;
  isCreatable?: boolean;
  isShowAvatarInOptions?: boolean;
  startIcon?: React.ReactNode;
  onChange: (option: any, actionMeta: ActionMeta<OptionType>) => void;
  controlShouldRenderValue?: boolean;
  isDisableKeybordClear?: boolean;
};

// TODO Change loader component
// TODO onChange any type
// TODO Style clear and open indicator

const MuiSelect = forwardRef<any, MuiSelectProps>(
  (
    {
      label,
      placeholder = '',
      isError = false,
      helpText = '',
      options = [],
      value,
      isRequired,
      isClearable = false,
      isCreatable = false,
      isSearchable = false,
      isDisabled = false,
      isLoading = false,
      isMulti = false,
      isShowAvatarInOptions = false,
      startIcon,
      size = 'medium',
      onChange,
      getAsyncData,
      clearAsyncData,
      controlShouldRenderValue = true,
      isDisableKeybordClear = false,

      ...arg
    },
    ref,
  ) => {
    const isSmallDisplay = useMediaQuery(`${theme.breakpoints.down('md')}`);
    const [searchValue, setSearchValue] = useState('');
    const onKeyDown = (e: any) => {
      if (!isDisableKeybordClear) return;
      if (e.keyCode === 8 && searchValue.length === 0) {
        e.preventDefault();
      }
    };

    const handleInputChange = (inputValue: string) => {
      setSearchValue(inputValue);
    };

    const selectStyle = setSelectStyle(isError, size, !!startIcon, isClearable);
    return (
      <Box sx={{ position: 'relative' }}>
        {label ? <InputLabel label={label} isRequired={isRequired} /> : <></>}

        <SelectContextProvider value={{ isShowAvatarInOptions }}>
          {isCreatable ? (
            <CreatableSelect
              {...arg}
              ref={ref}
              placeholder={placeholder}
              value={value}
              options={options}
              isSearchable={isSearchable}
              isDisabled={isDisabled}
              components={{ DropdownIndicator, ClearIndicator, Option }}
              onKeyDown={onKeyDown}
              onChange={(newValue, actionMeta) => {
                // eslint-disable-next-line no-underscore-dangle
                if (newValue?.__isNew__) {
                  // eslint-disable-next-line no-underscore-dangle
                  return onChange({ ...newValue, isNew: newValue.__isNew__ }, actionMeta);
                }
                return onChange(newValue, actionMeta);
              }}
              escapeClearsValue={false}
              isMulti={isMulti}
              styles={selectStyle}
              isClearable={isClearable}
              controlShouldRenderValue={controlShouldRenderValue}
              isLoading={isLoading}
              onFocus={() => {
                getAsyncData?.();
              }}
              onBlur={() => {
                clearAsyncData?.();
              }}
            />
          ) : (
            <Select
              {...arg}
              ref={ref}
              placeholder={placeholder}
              value={value}
              options={options}
              isOptionDisabled={(option) => (option.isDisabled ? option.isDisabled : false)}
              isSearchable={isSmallDisplay && !isMulti ? false : isSearchable}
              isDisabled={isDisabled}
              onChange={onChange}
              onInputChange={handleInputChange}
              onKeyDown={onKeyDown}
              escapeClearsValue={false}
              isMulti={isMulti}
              styles={selectStyle}
              components={{ DropdownIndicator, ClearIndicator, Option }}
              controlShouldRenderValue={controlShouldRenderValue}
              isClearable={isClearable}
              isLoading={isLoading}
              onFocus={() => {
                getAsyncData?.();
              }}
              onBlur={() => {
                clearAsyncData?.();
              }}
            />
          )}
        </SelectContextProvider>

        {startIcon && (
          <ReactSelectStartIconContainer label={label ? label?.length > 1 : false}>
            {startIcon}
          </ReactSelectStartIconContainer>
        )}

        <ErrorMessage message={helpText} isShow={isError} />
      </Box>
    );
  },
);

export default MuiSelect;
