import React from 'react';


export const SortItems = ({ setSort }) => {

  return (
    <div className='sort'>
        <label>Sort By </label>
        <select onChange={(e) => {setSort(e.target.value)}}>
            <option defaultValue>Alphabetical</option>
            <option>Alphabetical (Reverse)</option>
            <option>Last Edited</option>
            <option>Date Added (Latest)</option>
            <option>Date Added (Earliest)</option>
        </select>
    </div>
  );
};
