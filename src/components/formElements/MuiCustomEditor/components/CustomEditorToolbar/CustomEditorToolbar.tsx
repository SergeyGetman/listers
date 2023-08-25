import React from 'react';
import { Grid } from '@mui/material';
import { ReactComponent as BoldIcon } from '../../../../../assets/Images/bold-icon.svg';
import { ReactComponent as ItalicIcon } from '../../../../../assets/Images/italic-icon.svg';
import { ReactComponent as UnderlineIcon } from '../../../../../assets/Images/underline-icon.svg';
import { ReactComponent as NmberedIcon } from '../../../../../assets/Images/numeratrion-icon.svg';
import { ReactComponent as AlignLeftIcon } from '../../../../../assets/Images/align-left-icon.svg';
import { ReactComponent as AlignCenterIcon } from '../../../../../assets/Images/align-center-icon.svg';
import { ReactComponent as UndoIcon } from '../../../../../assets/Images/undo-icon.svg';
import { ReactComponent as RedoIcon } from '../../../../../assets/Images/rendo-icon.svg';
import RedoBtn from './components/RedoBtn';
import UndoBtn from './components/UndoBtn';
import BlockBtn from './components/BlockBtn';
import MarkBtn from './components/MarkBtn';

const CustomEditorToolbar = () => {
  return (
    <Grid
      sx={{ mt: '16px', position: 'absolute', bottom: '6px', left: '10px' }}
      container
      columnSpacing={{ xs: '4px', sm: '11px' }}
    >
      <Grid item>
        <MarkBtn format="bold" icon={<BoldIcon />} />
      </Grid>
      <Grid item>
        <MarkBtn format="italic" icon={<ItalicIcon />} />
      </Grid>
      <Grid item>
        <MarkBtn format="underline" icon={<UnderlineIcon />} />
      </Grid>
      <Grid item>
        <BlockBtn format="numbered-list" icon={<NmberedIcon />} />
      </Grid>
      <Grid item>
        <BlockBtn format="left" icon={<AlignLeftIcon />} />
      </Grid>
      <Grid item>
        <BlockBtn format="center" icon={<AlignCenterIcon />} />
      </Grid>
      <Grid item>
        <UndoBtn icon={<UndoIcon />} />
      </Grid>
      <Grid item>
        <RedoBtn icon={<RedoIcon />} />
      </Grid>
    </Grid>
  );
};

export default CustomEditorToolbar;
