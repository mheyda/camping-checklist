import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

import { TileList } from '../../components/tileList/TileList';
import { NewItemForm } from '../../components/newItemForm/NewItemForm';
import { SortItems } from '../../components/sortItems/SortItems';
import { FilterItems } from '../../components/filterItems/FilterItems';

export const ListPage = ({ lists, addItem, deleteItem, editItem, sortItems }) => {
    // Retrieve listTitle and index of list from URL
    let { id } = useParams();
    const listTitle = id.split('|')[0];
    const listIndex = id.split('|')[1];

    // Set state variables for new item title
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('All');
    const [sort, setSort] = useState('Alphabetical');
    const [listIsEmpty, setListIsEmpty] = useState(lists[listIndex].items.length === 0);

    // Add item to a list
    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            title: title.trim(),
            checked: false,
            dateAdded: new Date(),
            lastEdited: new Date()
        }
        setTitle('');
        addItem(newItem, listTitle);
        sortItems(listTitle, sort);
    };

    // Delete item in a list
    const handleDelete = (e) => {
        const indexOfItem = e.target.dataset.index;
        deleteItem(indexOfItem, listTitle);
        sortItems(listTitle, sort);
    }

    // Edit item in a list
    const handleEdit = (e) => {
        e.preventDefault();
        const indexOfItem = e.target.dataset.index;
        const newName = e.target.dataset.title;
        editItem(indexOfItem, listTitle, newName);
        sortItems(listTitle, sort);
    }

    // Check if there are any items in the list
    useEffect(() => {
        if (lists[listIndex].items.length === 0) {
            setListIsEmpty(true)
        } else {
            setListIsEmpty(false);
        }
    }, [lists])

    // Sort items when sort changes
    useEffect(() => {
        sortItems(listTitle, sort);
    }, [sort])

  return (
    <div style={{position: 'relative'}}>
        <Link className='btnBack' to='/'>Back</Link>
        <h1>{listTitle}</h1>
        {listIsEmpty
        ?
        <div>
            <NewItemForm handleSubmit={handleSubmit} title={title} setTitle={setTitle} />
            <p>Your list is empty! Add an item above.</p>
        </div>
        :
        <>
            <NewItemForm handleSubmit={handleSubmit} title={title} setTitle={setTitle} />
            <div className='filterAndSort'>
                <SortItems setSort={setSort} />
                <FilterItems setFilter={setFilter} />
            </div>
        </>
        }
        <TileList tiles={lists[listIndex].items} isList={false} handleDelete={handleDelete} handleEdit={handleEdit} filter={filter} />
    </div>
  );
};
