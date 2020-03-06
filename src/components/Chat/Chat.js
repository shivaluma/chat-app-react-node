import React from 'react';

import Panel from './User/Panel';
import ListConversation from './ChatList/ListConversation';
import TitleBar from './ChatBox/TitleBar';
import InputPanel from './ChatBox/InputPanel';
const Chat = () => {
  return (
    <div className='h-screen'>
      <div className='flex'>
        <div className='flex flex-col w-full md:w-1/4 max-h-full'>
          <Panel />
          <ListConversation />
        </div>
        <div className='hidden md:flex h-screen w-3/4 border-l-2 border-gray-200 flex-col'>
          <TitleBar className='self-start' />

          <div className='flex-grow'></div>

          <div className='w-full px-4'>
            <InputPanel className='w-7/8 self-end' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
