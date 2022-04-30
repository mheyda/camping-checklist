import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";


export const Tile = ({ 
  tile, 
  tiles, 
  index, 
  isList, 
  handleDelete, 
  handleEdit,
  reSort,
  filter }) => {
  
  const [checked, setChecked] = useState(tile.checked);
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(tile.title);

  const toggleCheckbox = () => {
    checked ? setChecked(tile.checked = false) : setChecked(tile.checked = true);
    reSort();
  }

  // Only show items according to filter ('All', 'Checked', or 'Unchecked')
  let display = false;
  if (filter === 'All') {display = true}
  else if (filter === 'Checked' && tile.checked) {display = true}
  else if (filter === 'Unchecked' && !tile.checked) {display = true}

  // Every time a tile is deleted, reset editing box
  useEffect(() => {
    setEditing(false);
    setNewTitle(tile.title);
    setChecked(tile.checked);
  }, [tiles, tile])


  if (display) {
    return (
      <li>
        {editing
        ? 
          <form onSubmit={(e) => {handleEdit(e); setEditing(false)}} data-index={index} data-title={newTitle}>
            <div className='listItemContainer'>
              <input className='editBox' type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              <input className='itemActionButton btnPrimary' type='submit' value='Save' />
              <button className='itemActionButton btnSecondary' onClick={() => {setEditing(false); setNewTitle(tile.title)}}>Cancel</button>
            </div>
          </form>
        : 
        <div className='listItemContainer'>
          {isList
          ?
          <Link className='linkBox' to={`/my-lists/${tile.title}|${index}`}>{tile.title}</Link>
          :
          <label className='checkBox'>
            <input type="checkbox" value={tile.title} checked={checked} id={index} onChange={toggleCheckbox} />
            <p aria-label={tile.title}>{tile.title}</p>
          </label>
          }
          <button className='itemActionButton btnSecondary' onClick={() => setEditing(true)}>Edit<i className="fa-solid fa-pen"></i></button>
          <button className='itemActionButton btnDanger' data-index={index} onClick={handleDelete}>Delete<i data-index={index} className="fa-solid fa-trash"></i></button>
        </div>
        }
      </li>
    );
  }
  return
};
