import React, { useRef, useContext, useState } from 'react';
import request from 'request';
import url from '../../../configs/url';
import { GlobalContext } from '../../../contexts/ConversationState';
import socket from '../../../configs/socket';

const InputPanel = ({ cid, uid }) => {
  const chatFieldRef = useRef(null);
  const { updateConversation, updateRefresh } = useContext(GlobalContext);
  const [isSending, setSending] = useState(false);
  const sendMessage = () => {
    const content = chatFieldRef.current.value;
    if (!content || content === '') return;
    setSending(true);
    const options = {
      uri: `${url.LOCAL}/api/send-message`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.chattoken}`
      },
      body: JSON.stringify({
        cid: cid,
        uid: uid,
        content: content,
        username: localStorage.username
      })
    };

    request.post(options, function(err, httpResponse, body) {
      if (httpResponse.statusCode !== 200) {
        console.log('Send failed');
      } else {
        chatFieldRef.current.value = '';
        console.log('Send success');
        const obj = JSON.parse(body);
        updateConversation(obj.conversation);
        socket.emit('user-send-message', obj.conversation);
      }
      setSending(false);
    });
  };

  return (
    <div className='w-full h-16 bg-white flex p-2'>
      <input
        type='search'
        ref={chatFieldRef}
        className='flex-grow flex-shrink px-4 py-4 bg-gray-300 text-gray-900 rounded-full outline-none truncate'
        placeholder='Input your message...'
      />

      <button
        className='flex-shrink-0 mx-2 bg-blue-400 rounded-full  focus:outline-none'
        style={{ flexBasis: 100 }}
        onClick={sendMessage}
        disabled={isSending}
      >
        {isSending ? (
          <div className='spinner'>A</div>
        ) : (
          <div className='flex items-center justify-center text-white '>
            <span className='font-semibold mr-1 '>Send</span>
            <svg
              className='h-4 w-4 fill-current'
              viewBox='0 0 1000 1000'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M10,991.1l980-493.2L10,8.9l101.1,415.7l532.7,73.4l-532.7,70.5L10,991.1z' />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};

export default InputPanel;
