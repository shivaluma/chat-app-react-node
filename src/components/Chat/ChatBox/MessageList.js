import React, { useContext, useEffect, useState } from 'react';
import SingleMessage from './SingleMessage';
import { animateScroll } from 'react-scroll';
import { GlobalContext } from '../../../contexts/ConversationState';

const MessageList = props => {
  const { getConversation, isReady, refresh } = useContext(GlobalContext);
  const cvs = getConversation(props.conversationId);
  const userId = localStorage.userId;
  const [messages, setMessages] = useState(cvs.messages);
  useEffect(() => {
    setMessages(cvs.messages);
  }, [isReady, props.conversationId]);

  useEffect(() => {
    setMessages(cvs.messages);
  }, [refresh]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages',
      smooth: false,
      duration: 0
    });
  }, [messages]);

  return (
    <div
      className='bg-white flex-grow flex flex-col overflow-y-scroll'
      id='messages'
    >
      {messages.map(el => (
        <SingleMessage key={el._id} message={el} myId={userId} />
      ))}
    </div>
  );
};

export default MessageList;
