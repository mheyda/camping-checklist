import React from 'react';
import { Tile } from '../tile/Tile';


export const TileList = ( { tiles, isList, handleDelete, handleEdit, filter } ) => {

  return (
    <ul>
        {tiles.map((tile, index) => (
            <Tile 
            key={index} 
            tile={tile}
            tiles={tiles}
            index={index}
            isList={isList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            filter={filter}
            />
        ))}
    </ul>
  );
};
