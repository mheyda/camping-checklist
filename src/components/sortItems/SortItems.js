import React from 'react';


export const SortItems = ({ setSort }) => {

  return (
    <div className='sort'>
        <label>Sort By </label>
        <select onChange={(e) => {setSort(e.target.value)}}>
            <option defaultValue>Checked</option>
            <option>Unchecked</option>
            <option>Alphabetical</option>
            <option>Alphabetical (Reverse)</option>
            <option>Last Edited</option>
            <option>Date Added (Latest)</option>
            <option>Date Added (Earliest)</option>
        </select>
    </div>
  );
};
