import React from 'react';
import Panel from '../User/Panel';
import ListConversation from './ListConversation';
const ChatList = () => {
  return (
    <div className='flex flex-col w-1/4 max-h-full'>
      <Panel />
      <ListConversation />
    </div>
  );
};

export default ChatList;
