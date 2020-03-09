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
    if (cvs) {
      setMessages(cvs.messages);
    }
  }, [isReady, props.conversationId]);

  useEffect(() => {
    setMessages(cvs.messages);
    console.log('set on refresh');
  }, [refresh]);

  useEffect(() => {
    setMessages(cvs.messages || []);
    console.log('set on init');
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
