import React from 'react';


export const FilterItems = ({ setFilter }) => {

  return (
    <div className='filter'>
        <label>Filter By </label>
        <select onChange={(e) => {setFilter(e.target.value)}}>
            <option defaultValue>All</option>
            <option>Checked</option>
            <option>Unchecked</option>
        </select>
    </div>
  );
};
