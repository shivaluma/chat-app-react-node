import React from 'react';
import getAvatar from '../../../configs/getAvatar';
const SingleMessage = ({ message, myId, name }) => {
  const date = new Date(message.time);
  const dateString = `${date.getHours()} : ${date.getMinutes()}`;
  return message.ofUser !== myId ? (
    <div className='flex mx-3 mt-4 max-w-xs'>
      <img
        src={getAvatar(name)}
        alt='avatar'
        className='h-8 w-8 self-end mr-2'
      />
      <div className='py-2 px-4 bg-gray-300 rounded-xl'>
        <p className='text-black max-w-xs break-words whitespace-pre-line'>
          {message.content}
        </p>
      </div>
    </div>
  ) : (
    <div className='mx-3 mt-4 flex self-end tooltip'>
      <div className='py-2 px-4 bg-gray-900 rounded-xl '>
        <p className='text-white max-w-xs break-words'>{message.content}</p>
      </div>
      <span className='tooltipleft'>{dateString}</span>
    </div>
  );
};

export default SingleMessage;
