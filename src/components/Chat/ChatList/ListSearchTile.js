import React from 'react';
import SearchTile from './SearchTile';

const ListSearchTile = ({ listResults, openConversation, setMouse }) => {
  return (
    <div onMouseOver={() => setMouse(true)} onMouseOut={() => setMouse(false)}>
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
