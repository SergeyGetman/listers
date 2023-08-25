import { Box, Collapse } from '@mui/material';
import React, { FC, memo, useCallback } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import CircularButton from '../../../../../components/buttons/CilrcularButton';
import MuiBaseTextFiled from '../../../../../components/formElements/MuiBaseTextFiled';
import { ModalNamesEnum } from '../../../../../shared/enums/modalNames.enum';
import { useAppDispatch } from '../../../../../shared/hooks/redux';
import { useDebounce } from '../../../../../shared/hooks/useDebounce';
import { clearThreadsState, setThreadsQuery } from '../../../../../store/chat/chatSlice';
import { getThreads } from '../../../../../store/chat/chatThunk';
import { setLoading } from '../../../../../store/Common/commonSlice';
import modalObserver from '../../../../../shared/utils/observers/modalObserver';

type Props = {
  isGroup?: boolean;
};

const ChatSearch: FC<Props> = ({ isGroup }) => {
  const dispatch = useAppDispatch();
  const { type } = useParams();
  const { t } = useTranslation();

  const debounceSearch = useDebounce((value: string) => {
    dispatch(setLoading(true));
    dispatch(clearThreadsState(true));
    dispatch(setThreadsQuery(value));
    dispatch(getThreads({ isGroup: type === 'group' ? 1 : 0, query: value, page: 1 })).finally(() => {
      dispatch(setLoading(false));
    });
  }, 1000);

  const handleChangeSearch = useCallback(
    (value: string) => {
      debounceSearch(value);
    },
    [debounceSearch],
  );

  const handleCreateGroupModal = () => {
    modalObserver.addModal(ModalNamesEnum.groupChatModal, { props: {} });
  };

  return (
    <Box mt="12px" display="flex" alignItems="center">
      <Box width="100%">
        <MuiBaseTextFiled
          onChange={(e: React.FormEvent<HTMLInputElement>) => handleChangeSearch(e.currentTarget.value)}
          placeholder={
            isGroup
              ? t('general.placeholders.search_chat_name')
              : t('general.placeholders.search_friends_name')
          }
          size="medium"
          isFullWidth
        />
      </Box>
      <Collapse unmountOnExit orientation="horizontal" in={type === 'group'}>
        <Box p="8px 8px" display="flex" alignItems="center" justifyContent="center">
          <CircularButton onClick={handleCreateGroupModal} size="smallLarge" />
        </Box>
      </Collapse>
    </Box>
  );
};

export default memo(ChatSearch);
