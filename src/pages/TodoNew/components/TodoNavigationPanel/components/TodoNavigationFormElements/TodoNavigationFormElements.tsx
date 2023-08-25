import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MuiBaseTextFiled from '../../../../../../components/formElements/MuiBaseTextFiled';
import MuiCheckmarksSelect from '../../../../../../components/formElements/MuiCheckmarksSelect';

type Props = {
  isTabletDisplay?: boolean;
  selectValue: string[];
  selectOptions: { value: string; label: string }[];
  selectOnChange: (e: { label: string; value: string }) => void;
  textFieldValue: string;
  textFieldOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
  isViewCheckbox: boolean;
};

const TodoNavigationFormElements: FC<Props> = ({
  isTabletDisplay = false,
  selectValue,
  selectOptions,
  selectOnChange,
  textFieldValue,
  textFieldOnChange,
  isViewCheckbox = true,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          width: '240px',
          marginRight: '12px',
          '& .MuiInputLabel-root': {
            display: 'none',
          },
        }}
      >
        <MuiCheckmarksSelect
          onChange={selectOnChange}
          value={selectValue}
          options={selectOptions}
          placeholder={t('general.placeholders.selectFilters')}
        />
      </Box>
      <Box sx={{ width: '240px', marginRight: isTabletDisplay ? 0 : '12px' }}>
        <MuiBaseTextFiled
          variant="outlined"
          required
          value={textFieldValue}
          placeholder={t('general.placeholders.searchBy', {
            props: isViewCheckbox ? t('general.checklistTitle') : t('general.noteTitle'),
          })}
          onChange={textFieldOnChange}
          size="medium"
          inputProps={{
            startAdornment: <SearchIcon sx={{ width: '24px !important', height: '24px !important' }} />,
          }}
        />
      </Box>
    </>
  );
};

export default React.memo(TodoNavigationFormElements);
