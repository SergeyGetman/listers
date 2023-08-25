import { useSearchParams } from 'react-router-dom';
import { useMemo, memo } from 'react';
import MuiDrawer from '../../../modalsElements/containers/MuiDrawer';
import { useAppDispatch } from '../../../../shared/hooks/redux';
import { ModalNamesEnum } from '../../../../shared/enums/modalNames.enum';
import ReplyModelContainer from './ReplyModelContainer';
import { clearReplyState } from '../../../../store/chat/chatSlice';
import modalObserver, { ModalProps } from '../../../../shared/utils/observers/modalObserver';

const ReplyModal = ({ isOpen, props }: ModalProps) => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const replyId = useMemo(() => searchParams.get('reply') as string, [searchParams]);

  const onClose = () => {
    modalObserver.removeModal(ModalNamesEnum.replyModal);
    dispatch(clearReplyState());
    setSearchParams({});
  };

  return (
    <MuiDrawer isShow={!!isOpen} onClose={onClose}>
      {props?.threadId ? (
        <ReplyModelContainer threadId={props?.threadId} onClose={onClose} replyId={replyId} />
      ) : (
        <></>
      )}
    </MuiDrawer>
  );
};

export default memo(ReplyModal);
