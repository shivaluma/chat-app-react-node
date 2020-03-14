import React, { useContext, useEffect, useState, useRef } from 'react';
import SingleMessage from './SingleMessage';
import { animateScroll } from 'react-scroll';
import { GlobalContext } from '../../../contexts/ConversationState';
import socket from '../../../configs/socket';
import TypingIndicator from './TypingIndicator';
import url from '../../../configs/url';
import request from 'request';

const MessageList = props => {
  const { isReady, newMessage } = useContext(GlobalContext);

  const cvs = props.conversation;
  const userId = localStorage.userId;
  const [messages, setMessages] = useState([]);
  const [otherTyping, setOtherTyping] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [lastIndex, setLastIndex] = useState(-1);

  const messageListRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    setMessages([]);
    setLastIndex(-1);
    if (cvs._id) {
      const options = {
        uri: `${url.LOCAL}/api/get-messages?cid=${cvs._id}&last=-1`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.chattoken}`
        }
      };

      request.get(options, function(err, httpResponse, body) {
        if (httpResponse.statusCode === 200) {
          const { messageList, newLast } = JSON.parse(body);
          setMessages(messageList);

          setLastIndex(newLast);
          setLoading(false);
        }
      });
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
  }, [isReady, cvs._id]);

  const loadMoreMessage = _ => {
    if (lastIndex > 0) {
      const options = {
        uri: `${url.LOCAL}/api/get-messages?cid=${cvs._id}&last=${lastIndex}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.chattoken}`
        }
      };

      request.get(options, function(err, httpResponse, body) {
        if (httpResponse.statusCode === 200) {
          const { messageList, newLast } = JSON.parse(body);
          setMessages([...messageList, ...messages]);
          setLastIndex(newLast);
          setLoadingMore(false);
        }
      });
    }
  };

  useEffect(() => {
    if (cvs._id && newMessage) {
      if (cvs._id === newMessage.cid) {
        setMessages([...messages, newMessage.message]);
      }
    }
  }, [newMessage]);

  // useEffect(() => {
  //   if (messages.length > 0) {
  //     setLastMessageId(messages[0]._id);
  //   }
  // }, [messages]);

  useEffect(() => {
    animateScroll.scrollToBottom({
      containerId: 'messages',
      smooth: false,
      duration: 0
    });
  }, [isLoading, messages, otherTyping]);

  return (
    <>
      {isLoadingMore ? (
        <div className='bg-white w-full h-48 flex '>
          <div className='spinner flex-grow'>A</div>
        </div>
      ) : null}

      <div
        className='bg-white flex-grow flex flex-col overflow-y-auto'
        id='messages'
        ref={messageListRef}
        onScroll={e => {
          if (e.target.scrollTop === 0) {
            if (lastIndex > 0) {
              setLoadingMore(true);
              loadMoreMessage(e);
            }
          }
        }}
      >
        {isLoading ? <div className='spinner-md flex-grow'>A</div> : messages.map(el => <SingleMessage key={el._id || Date.now()} name={props.name} message={el} myId={userId} />)}

        {otherTyping ? <TypingIndicator name={otherName} /> : null}
      </div>
    </>
  );
};

export default MessageList;
