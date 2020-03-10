import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import request from 'request';
import url from '../configs/url';
import { history } from '../configs/browserHistory';
const initialState = {
  conversations: [],
  ready: false,
  sessionValid: true,
  refresh: false
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    (async function fetchData() {
      console.log('FETCH DATA');
      const options = {
        uri: `${url.LOCAL}/api/conversation-list?id=${localStorage.userId}`,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.chattoken}`
        }
      };
      // const response = await request.get(options);

      // const obj = JSON.parse(response);
      // console.log(obj);

      request.get(options, function(err, httpResponse, body) {
        if (err || httpResponse.statusCode !== 200) {
          localStorage.removeItem('chattoken');
          localStorage.removeItem('username');
          localStorage.removeItem('userId');
          history.replace('/');
        } else {
          const obj = JSON.parse(body);
          updateConversations(obj.list);
        }
      });
    })();
  }, []);

  const updateConversations = cs => {
    dispatch({ type: 'update', conversations: cs });
  };

  const updateConversation = cs => {
    dispatch({ type: 'update-single', conversation: cs });
  };

  const addConversation = cs => {
    dispatch({ type: 'add', conversation: cs });
  };

  const updateRefresh = () => {
    dispatch({ type: 'refresh' });
  };

  const getConversation = cid => {
    return state.conversations.find(c => c._id === cid) || { messages: [] };
  };

  return (
    <GlobalContext.Provider
      value={{
        conversations: state.conversations,
        isReady: state.ready,
        refresh: state.refresh,
        updateRefresh: updateRefresh,
        updateConversations: updateConversations,
        updateConversation: updateConversation,
        getConversation: getConversation,
        addConversation: addConversation
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
