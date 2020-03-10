import React, { useContext, useEffect, useState } from 'react';
import SingleMessage from './SingleMessage';
import { animateScroll } from 'react-scroll';
import { GlobalContext } from '../../../contexts/ConversationState';
import socket from '../../../configs/socket';
import TypingIndicator from './TypingIndicator';

const MessageList = props => {
  const { isReady, refresh } = useContext(GlobalContext);

  const cvs = props.conversation;
  const userId = localStorage.userId;
  const [messages, setMessages] = useState(cvs.messages);
  const [otherTyping, setOtherTyping] = useState(false);
  const [otherName, setOtherName] = useState('');

  useEffect(() => {
    if (cvs) {
      setMessages(cvs.messages);
      socket.on('user-typing', ({ cid, uid, isTyping, name }) => {
        if (cid === cvs._id && uid !== userId) {
          setOtherName(name);
          if (isTyping !== otherTyping) {
            setOtherTyping(isTyping);
          } else {
            setOtherTyping(false);
          }
        }
      });
    }
  }, [isReady, props.conversation]);

  useEffect(() => {
    setMessages(cvs.messages);
    console.log('set on refresh');
  }, [refresh]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages',
      smooth: false,
      duration: 0
    });
  }, [messages, otherTyping]);

  return (
    <div
      className='bg-white flex-grow flex flex-col overflow-y-auto'
      id='messages'
    >
      {messages.map(el => (
        <SingleMessage
          key={el._id}
          name={props.name}
          message={el}
          myId={userId}
        />
      ))}

      {otherTyping ? <TypingIndicator name={otherName} /> : null}
    </div>
  );
};

export default MessageList;
