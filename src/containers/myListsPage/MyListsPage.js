import React, { useEffect, useState } from 'react';

import { NewListForm } from '../../components/newListForm/NewListForm';
import { TileList } from '../../components/tileList/TileList';


export const MyListsPage = ({ lists, addList, deleteList, editList }) => {

  const [title, setTitle] = useState('');
  const [listIsEmpty, setListIsEmpty] = useState(lists.length === 0);

  // Add list to My Lists page
  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if name is a repeat
    if (lists.filter(list => list.title.toLowerCase() === title.trim().toLowerCase()).length > 0) {
      alert('List already exists! Please enter a new list title.')
    }
    else {
      const newList = {
        title: title.trim(),
        items: []
      }
      setTitle('');
      addList(newList);
    }
  }

  // Delete list from My Lists page
  const handleDelete = (e) => {
    const indexOfList = e.target.id;
    deleteList(indexOfList);
  }

  // Edit list title
  const handleEdit = (e) => {
    e.preventDefault();
    const indexOfList = e.target.dataset.index;
    const newTitle = e.target.dataset.title;
    editList(indexOfList, newTitle);
  }

  // Check if there are any items in the list
  useEffect(() => {
    if (lists.length === 0) {
      setListIsEmpty(true)
    } else {
      setListIsEmpty(false);
    }
  }, [lists])

  return (
    <div>
        <h1>My Lists</h1>
        <NewListForm handleSubmit={handleSubmit} title={title} setTitle={setTitle} />
        {listIsEmpty
        ? <p>You don't have any lists! Add one above.</p>
        : 
        <TileList tiles={lists} isList={true} handleDelete={handleDelete} handleEdit={handleEdit} filter='All'/>
        }
    </div>
  );
};
