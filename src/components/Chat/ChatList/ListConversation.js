import React, { useState, useContext, useEffect } from 'react';
import Conversation from './Conversation';
import SearchTile from './SearchTile';
import url from '../../../configs/url';
import request from 'request';
import { GlobalContext } from '../../../contexts/ConversationState';
import { history } from '../../../configs/browserHistory';
import socket from '../../../configs/socket';
const ListConversation = () => {
  const [isFocusing, updateFocusing] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const { conversations, addConversation } = useContext(GlobalContext);

  const myUsername = localStorage.username;
  const myId = localStorage.userId;

  const searchOnFocus = () => {
    updateFocusing(true);
  };

  const searchOutFocus = event => {
    event.target.value = '';
    setSearchResult([]);
    updateFocusing(false);
  };

  useEffect(() => {
    if (conversations) {
      console.log('Emit join all chat room');
      conversations.forEach(el => {
        socket.emit('user-join-room', { roomId: el._id });
      });
    }
  }, [conversations.length]);

  const searchPeople = event => {
    const options = {
      uri: url.LOCAL + `/api/search?s=${event.target.value}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.chattoken}`
      }
    };
    request.get(options, function(err, httpResponse, body) {
      const objBody = JSON.parse(body);
      if (httpResponse.statusCode !== 200) {
        searchResult.length = 0;
        return;
      } else {
        setSearchResult([...objBody.result]);
      }
    });
  };

  const openConversation = id => {
    console.log('im here');
    const options = {
      uri: url.LOCAL + `/api/conversation?id1=${myId}&id2=${id}`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.chattoken}`
      }
    };

    request.get(options, function(err, httpResponse, body) {
      if (err) return;
      console.log(httpResponse.statusCode);
      if (httpResponse.statusCode === 200) {
        const obj = JSON.parse(body);
        addConversation(obj.conversation);
        history.push(`/chat/${obj.conversation._id}`);
      }
    });
  };

  return (
    <div className='bg-white flex flex-col items-center'>
      <div className='mx-2 w-full px-4 mt-1 flex items-center relative mb-4'>
        <svg
          className='h-4 w-4 fill-current text-gray-700 absolute left ml-4'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
        >
          <path d='M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z'></path>
        </svg>
        <input
          type='search'
          className='w-full px-12 py-2 bg-gray-200 text-gray-700 rounded-full outline-none'
          placeholder='Search by name...'
          onFocus={searchOnFocus}
          onBlur={searchOutFocus}
          onChange={searchPeople}
        />
      </div>

      {!isFocusing ? (
        <div className='w-full px-2'>
          {conversations.map(el => (
            <Conversation
              key={el._id}
              conversation={el}
              otherName={
                myUsername === el.firstUserName
                  ? el.secondUserName
                  : el.firstUserName
              }
            />
          ))}
        </div>
      ) : (
        <div className='w-full px-2'>
          {searchResult.map(el => (
            <div
              key={el._id}
              onClick={() => {
                openConversation(el._id);
              }}
            >
              <SearchTile username={el.username} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListConversation;
