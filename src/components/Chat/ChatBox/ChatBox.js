import React, { useContext, useEffect } from 'react';
import TitleBar from './TitleBar';
import MessageList from './MessageList';
import InputPanel from './InputPanel';
import { GlobalContext } from '../../../contexts/ConversationState';
import socket from '../../../configs/socket';
import EmojiPicker from 'emoji-picker-react';

const ChatBox = ({ chatId, userId }) => {
  const { getConversation, updateConversation, addConversation } = useContext(
    GlobalContext
  );
  const cvs = getConversation(chatId);
  const otherUsername =
    (userId === cvs.firstId ? cvs.secondUserName : cvs.firstUserName) || '';
  useEffect(() => {
    socket.on('receive-message', conversation => {
      console.log('set on socket');
      const cvs = getConversation(conversation._id);
      if (cvs) {
        if (cvs.lastSender === conversation.lastSender) return;
        updateConversation(conversation);
      } else {
        addConversation(conversation);
      }
    });
  }, []);

  return (
    <div className='flex-grow flex-shrink flex max-h-full border-l-2 border-gray-200 flex-col'>
      <TitleBar name={otherUsername} className='self-start' />
      <MessageList name={otherUsername} conversation={cvs} />

      <div className='w-full px-4 mt-1 relative top-0 left-0'>
        {/* <div className='absolute' style={{ right: 20, bottom: 60 }}>
          <EmojiPicker />
        </div> */}
        <InputPanel cid={chatId} uid={userId} className='w-7/8 self-end' />
      </div>
    </div>
  );
};

export default ChatBox;
