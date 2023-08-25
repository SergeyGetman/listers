import React, { FC } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Grid } from '@mui/material';
import MuiCustomEditor from '../../formElements/MuiCustomEditor';
import BaseContainer from '../../containers/BaseContainer';
type EditorContainerProps = {
  control: Control<any>;
  blockTitle: string;
  label?: string;
  isShowHint?: boolean;
  maxHintValue?: number;
  placeholder?: string;
};
const EditorContainer: FC<EditorContainerProps> = (props) => {
  const { control, label, blockTitle, isShowHint = true, placeholder, maxHintValue = 5000 } = props;

  return (
    <BaseContainer title={blockTitle}>
      <Grid container rowSpacing="16px" columnSpacing="20px">
        <Grid item md={12} xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <MuiCustomEditor
                label={label}
                placeholder={placeholder}
                isShowHint={isShowHint}
                maxHintValue={maxHintValue}
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
    </BaseContainer>
  );
};

export default EditorContainer;
