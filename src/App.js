import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import { MyListsPage } from './containers/myListsPage/MyListsPage';
import { ListPage } from './containers/listPage/ListPage';


function App() {

  const [lists, setLists] = useState([
    // Add default lists
    {
      title: "App Functionality",
      items: [
        {
          title: 'This app can do the following...',
          checked: false,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'Create and delete lists and items',
          checked: false,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'Edit list and item titles',
          checked: false,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'Check off items',
          checked: false,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'Sort and filter items in multiple ways',
          checked: false,
          dateAdded: new Date(),
          lastEdited: new Date()
        }
      ]
    },
    {
      title: "Marshall's To-Learn List",
      items: [
        {
          title: 'React',
          checked: true,
          dateAdded: new Date(2022, 3, 1),
          lastEdited: new Date()
        },
        {
          title: 'Redux',
          checked: true,
          dateAdded: new Date(2022, 4, 1),
          lastEdited: new Date()
        },
        {
          title: 'TypeScript',
          checked: false,
          dateAdded: new Date(3000, 0, 1),
          lastEdited: new Date()
        },
        {
          title: 'Node.js',
          checked: false,
          dateAdded: new Date(3000, 0, 1),
          lastEdited: new Date()
        },
        {
          title: 'JavaScript',
          checked: true,
          dateAdded: new Date(2022, 0, 10),
          lastEdited: new Date()
        },
        {
          title: 'HTML',
          checked: true,
          dateAdded: new Date(2021, 9, 1),
          lastEdited: new Date()
        },
        {
          title: 'CSS',
          checked: true,
          dateAdded: new Date(2021, 9, 2),
          lastEdited: new Date()
        },
        {
          title: 'Bootstrap',
          checked: true,
          dateAdded: new Date(2021, 9, 20),
          lastEdited: new Date()
        }
      ]
    },
    {
      title: 'Why Marshall Deserves an Interview',
      items: [
        {
          title: 'Because he is...',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'a quick learner,',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'a great communicator,',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'self-motivated,',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'a natural problem solver,',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
        },
        {
          title: 'and team-oriented! (:',
          checked: true,
          dateAdded: new Date(),
          lastEdited: new Date()
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
      case 'Checked':
        newItems = newList.items.sort((a, b) => Number(b.checked) - Number(a.checked));
        break;
      case 'Unchecked':
        newItems = newList.items.sort((a, b) => Number(a.checked) - Number(b.checked));
        break;
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
    newList.items = newItems;
    setLists(() => [...newLists, newList].sort((a, b) => a.title.localeCompare(b.title)));
  }

  const ROUTES = {
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
          <Route path='/' element={<MyListsPage lists={lists} addList={addList} deleteList={deleteList} editList={editList} />} />
          <Route path={ROUTES.LIST} element={<ListPage lists={lists} addItem={addItem} deleteItem={deleteItem} editItem={editItem} sortItems={sortItems} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
