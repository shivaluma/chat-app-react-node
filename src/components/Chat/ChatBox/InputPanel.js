import React from 'react';

const InputPanel = () => {
  return (
    <div className='w-full h-16 bg-white flex p-2'>
      <input
        type='search'
        className='flex-grow flex-shrink px-4 py-4 bg-gray-300 text-gray-900 rounded-full outline-none'
        placeholder='Input your message...'
      />

      <button
        className='flex-shrink-0 mx-2 bg-blue-400 rounded-full flex items-center justify-center text-white outline-none'
        style={{ flexBasis: 100 }}
      >
        <span className='font-semibold mr-1 '>Send</span>
        <svg
          className='h-4 w-4 fill-current'
          viewBox='0 0 1000 1000'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M10,991.1l980-493.2L10,8.9l101.1,415.7l532.7,73.4l-532.7,70.5L10,991.1z' />
        </svg>
      </button>
    </div>
  );
};

export default InputPanel;
