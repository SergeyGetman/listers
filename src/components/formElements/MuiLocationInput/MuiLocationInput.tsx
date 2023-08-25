import { Box, Typography, useTheme } from '@mui/material';
import React, { forwardRef } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import MuiBaseTextFiled from '../MuiBaseTextFiled';
import { PlaceAutocompleteItemContainer } from './MuiLocationInput.style';
import CopyButton from '../../buttons/CopyButton';

type MuiLocationInputProps = {
  value?: string;
  onSearchError?: () => void;
  handleSelect?: (data: string) => void;
  onChange?: (e: any) => void;
  placeholder?: string;
  label?: string;
  name: string;
  isError?: boolean;
  errorMessage?: string;
  isShrink?: boolean;
};

const MuiLocationInput = forwardRef<HTMLHeadingElement, MuiLocationInputProps>((props, ref) => {
  const {
    value,
    placeholder,
    label,
    onSearchError,
    handleSelect,
    onChange,
    name,
    isError,
    errorMessage,
    isShrink,
  } = props;
  const theme = useTheme();
  return (
    <PlacesAutocomplete value={value} onChange={onChange} onSelect={handleSelect} onError={onSearchError}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <Box>
          <MuiBaseTextFiled
            {...getInputProps({ placeholder, label })}
            name={name}
            value={value}
            endAdornment={value ? <CopyButton content="ssss" /> : null}
            isError={isError}
            errorMessage={errorMessage}
            isShrink={isShrink}
            ref={ref}
          />

          <Box sx={{ backgroundColor: theme.palette.case.background }}>
            {loading && <div>Loading...</div>}

            {suggestions.map((suggestion) => {
              return (
                <PlaceAutocompleteItemContainer
                  {...getSuggestionItemProps(suggestion, {})}
                  key={suggestion.description}
                >
                  <Typography variant="default">{suggestion.description}</Typography>
                </PlaceAutocompleteItemContainer>
              );
            })}
          </Box>
        </Box>
      )}
    </PlacesAutocomplete>
  );
});

export default MuiLocationInput;
