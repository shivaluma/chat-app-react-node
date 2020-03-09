import React, { useContext, useEffect, useState } from 'react';
import SingleMessage from './SingleMessage';
import { animateScroll } from 'react-scroll';
import { GlobalContext } from '../../../contexts/ConversationState';
import socket from '../../../configs/socket';

const MessageList = props => {
  const {
    getConversation,
    isReady,
    refresh,
    addConversation,
    updateConversation
  } = useContext(GlobalContext);

  const cvs = getConversation(props.conversationId);
  const userId = localStorage.userId;
  const [messages, setMessages] = useState(cvs.messages);
  useEffect(() => {
    setMessages(cvs.messages);
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
  }, [isReady, props.conversationId]);

  useEffect(() => {
    setMessages(cvs.messages);
    console.log('set on refresh');
  }, [refresh]);

  useEffect(() => {
    setMessages(cvs.messages || []);
    console.log('set on init');
  }, []);

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
