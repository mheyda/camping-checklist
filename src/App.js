import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';

import { MyListsPage } from './containers/myListsPage/MyListsPage';
import { ListPage } from './containers/listPage/ListPage';


function App() {

  const [lists, setLists] = useState([
    // Add default lists
    {
      title: 'First List',
      items: [
        {
          title: 'grill',
          checked: false,
          dateAdded: new Date('2015'),
          lastEdited: new Date()
        },
        {
          title: 'tent',
          checked: false,
          dateAdded: new Date('2017'),
          lastEdited: new Date()
        },
        {
          title: 'water',
          checked: false,
          dateAdded: new Date('2016'),
          lastEdited: new Date()
        }
      ]
    },
    {
      title: 'Second List',
      items: [
        {
          title: 'backpack',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        },
        {
          title: 'rain jacket',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        },
        {
          title: 'camera',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        }
      ]
    },
    {
      title: 'Third List',
      items: [
        {
          title: 'phone',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        },
        {
          title: 'sunglasses',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        },
        {
          title: 'cup',
          checked: false,
          dateAdded: Date(),
          lastEdited: Date()
        }
      ]
    }
  ]);

  // Add, delete, edit, and sort lists
  const addList = (newList) => {
    setLists(() => [...lists, newList].sort((a, b) => a.title.localeCompare(b.title)));
  }
  const deleteList = (indexOfList) => {
    setLists(lists.filter((list, index) => index !== parseInt(indexOfList)));
  }
  const editList = (indexOfList, newTitle) => {
    const newList = lists[indexOfList];
    const newLists = lists.filter((list, index) => index !== parseInt(indexOfList))
    newList.title = newTitle;
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)));
  }

  // Add, delete, edit, and sort list items
  const addItem = (newItem, listTitle) => {
    const newList = lists.find(list => list.title === listTitle);
    const newLists = lists.filter(list => list.title !== listTitle)
    newList.items.push(newItem);
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)))
  }
  const deleteItem = (indexOfItem, listTitle) => {
    const newList = {...lists.find(list => list.title === listTitle)}
    newList.items.splice(indexOfItem, 1)
    const newLists = lists.filter(list => list.title !== listTitle)
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)));
  }
  const editItem = (indexOfItem, listTitle, newTitle) => {
    const newList = {...lists.find(list => list.title === listTitle)}
    newList.items[indexOfItem].title = newTitle;
    newList.items[indexOfItem].lastEdited = Date();
    const newLists = lists.filter(list => list.title !== listTitle)
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)))
  }
  const sortItems = (listTitle, sort) => {
    const newList = lists.find(list => list.title === listTitle);
    const newLists = lists.filter(list => list.title !== listTitle);
    let newItems;

    switch(sort) {
      case 'Alphabetical':
        newItems = newList.items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Alphabetical (Reverse)':
        newItems = newList.items.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Date Added (Latest)':
        newItems = newList.items.sort((a, b) => (new Date(b.dateAdded) - new Date(a.dateAdded)));
        break;
      case 'Date Added (Earliest)':
        newItems = newList.items.sort((a, b) => (a.dateAdded - b.dateAdded));
        break;
      case 'Last Edited':
        newItems = newList.items.sort((a, b) => (new Date(b.lastEdited) - new Date(a.lastEdited)));
        break;
      default: 
    }
    newList.items = newItems
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)));
  }

  const ROUTES = {
    HOME: '/my-lists',
    LIST: '/my-lists/:id'
  };

  return (
    <>
    {
    //<nav>
        //<NavLink to={ROUTES.HOME}>
        //Home
      //</NavLink>
    //</nav>
    }
      
      <main>
        <Routes>
          <Route exact path="/" element={<Navigate to={ROUTES.HOME} />}></Route>
          <Route path={ROUTES.HOME} element={<MyListsPage lists={lists} addList={addList} deleteList={deleteList} editList={editList} />} />
          <Route path={ROUTES.LIST} element={<ListPage lists={lists} addItem={addItem} deleteItem={deleteItem} editItem={editItem} sortItems={sortItems} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
