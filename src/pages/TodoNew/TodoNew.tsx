import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { TodoPageContainer } from './TodoNew.style';
import TodoNavigationPanel from './components/TodoNavigationPanel';
import { useAppSelector } from '../../shared/hooks/redux';
import TodoStub from './components/TodoStub/TodoStub';

const TodoNew = () => {
  const theme = useTheme();
  const isViewTodo = useAppSelector(({ profile }) => profile.data.view_data.is_view_todo);
  const isMobileDisplay = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TodoPageContainer>
      {isViewTodo || isMobileDisplay ? <TodoNavigationPanel /> : <></>}

      <Box
        sx={{
          flexGrow: 1,
          overflowX: 'hidden',
          height: '100%',
          width: '100%',
          scrollbarWidth: 'none',
        }}
      >
        {isViewTodo || isMobileDisplay ? <Outlet /> : <TodoStub />}
      </Box>
    </TodoPageContainer>
  );
};

export default React.memo(TodoNew);
