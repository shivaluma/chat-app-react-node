import React from 'react';
import SearchTile from './SearchTile';

const ListSearchTile = ({ listResults, openConversation, setMouse }) => {
  return (
    <div
      className='px-2 overflow-y-auto'
      onMouseOver={() => setMouse(true)}
      onMouseOut={() => setMouse(false)}
    >
      {listResults.map(result => (
        <SearchTile
          key={result._id}
          username={result.username}
          id={result._id}
          openConversation={openConversation}
        />
      ))}
    </div>
  );
};

export default ListSearchTile;
