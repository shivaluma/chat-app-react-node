import React from 'react';
import Avatar from '../../../assets/images/avatar.jpg';

const Conversation = () => {
  return (
    <div className='flex h-16 w-full hover:bg-gray-300 rounded-lg cursor-pointer'>
      <img src={Avatar} className='h-16 w-16 mx-4 p-1 rounded-full' />
      <div className='flex flex-col h-full justify-center'>
        <span className='font-semibold'>Tài Tấn Nguyễn</span>
        <p className='text-sm  text-gray-600'>
          Tài: Tao bị gay <span className='text-black ml-2'>8:56</span>
        </p>
      </div>
    </div>
  );
};

export default Conversation;
