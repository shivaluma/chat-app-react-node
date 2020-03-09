import React from 'react';
import TitleBar from './TitleBar';
import MessageList from './MessageList';
import InputPanel from './InputPanel';

const ChatBox = ({ chatId, userId }) => {
  return (
    <div className='flex-grow flex-shrink flex max-h-full border-l-2 border-gray-200 flex-col'>
      <TitleBar className='self-start' />
      <MessageList conversationId={chatId} />

      <div className='w-full px-4 mt-1'>
        <InputPanel cid={chatId} uid={userId} className='w-7/8 self-end' />
      </div>
    </div>
  );
};

export default ChatBox;
