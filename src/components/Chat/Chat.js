import React, { useEffect, useContext } from 'react';

import Panel from './User/Panel';
import ListConversation from './ChatList/ListConversation';
import TitleBar from './ChatBox/TitleBar';
import InputPanel from './ChatBox/InputPanel';
import MessageList from './ChatBox/MessageList';
import socket from '../../configs/socket';

import {
  GlobalProvider,
  GlobalContext
} from '../../contexts/ConversationState';

const Chat = props => {
  const userId = localStorage.userId;
  const chatId = props.match.params.id;
  const { conversations, isReady } = useContext(GlobalContext);
  useEffect(() => {
    document.title = 'Chat';
  }, []);

  useEffect(() => {
    if (props.match.params.id) {
      console.log('emit join room');
      socket.emit('user-join-room', { roomId: props.match.params.id });
    }
  }, [props.match.params.id]);

  return (
    <GlobalProvider>
      <div className='h-screen flex'>
        <div className='flex flex-col w-1/4 max-h-full'>
          <Panel />
          <ListConversation />
        </div>
        <div className='flex-grow flex-shrink flex max-h-full border-l-2 border-gray-200 flex-col'>
          <TitleBar className='self-start' />
          <MessageList conversationId={chatId} />

          <div className='w-full px-4 mt-1'>
            <InputPanel cid={chatId} uid={userId} className='w-7/8 self-end' />
          </div>
        </div>
      </div>
    </GlobalProvider>
  );
};

export default Chat;
