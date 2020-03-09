import React, { useEffect } from 'react';

import socket from '../../configs/socket';

import {
  GlobalProvider,
  GlobalContext
} from '../../contexts/ConversationState';
import ChatList from './ChatList/ChatList';
import ChatBox from './ChatBox/ChatBox';

const Chat = props => {
  const userId = localStorage.userId;
  const chatId = props.match.params.id;

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
        <ChatList />
        <ChatBox chatId={chatId} userId={userId} />
      </div>
    </GlobalProvider>
  );
};

export default Chat;
