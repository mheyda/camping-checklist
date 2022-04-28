import React from 'react';


export const NewListForm = ({ handleSubmit, title, setTitle }) => {

  return (
    <form onSubmit={handleSubmit}>
        <label>Add a List</label>
        <br></br>
        <input type='text' className='newEntry' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title' required autoFocus />
        <br></br>
        <input type='submit' className='newEntrySubmit' value='Add' />
    </form>
  );
};
