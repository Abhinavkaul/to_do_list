import './App.css';
import React, { useState } from "react";
function App() {

  const [inp, setinp] = useState('');
  const [listItems, setListItems] = useState([]);
  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();


  const makeinput = (s) => {
    setinp(s.target.value);
  };

  const makelist = () => {
    if (inp !== '') {
      setListItems([...listItems,
      {
        'value': inp,
        'editMode': false,
        'isDone': false
      }]);
      setinp('');
    }
  };

  const keyenter = (event) => {
    if (event.code === 'Enter') {
      makelist()
    }
  };

  const clearlist = () => {
    setListItems([]);
    setinp('')
  };

  const deleteList = (index) => {
    const updatedlist = [...listItems]
    updatedlist.splice(index, 1);
    setListItems(updatedlist);
  };

  const editList = (index, e) => {
    const updatedlist = [...listItems]
    updatedlist[index].value = e.target.value;
    setListItems(updatedlist);
  };

  const setEditMode = (index, val) => {
    const updatedlist = [...listItems]
    updatedlist[index].editMode = !val;
    setListItems(updatedlist);
  };

  const setIsDone = (index, val) => {
    const updatedlist = [...listItems]
    updatedlist[index].isDone = !val;
    setListItems(updatedlist);
  };

  const moveUp = (index) =>{
    const updatedlist = [...listItems]
    let a = updatedlist[index]
    updatedlist[index] = updatedlist[index-1]
    updatedlist[index-1]=a
    setListItems(updatedlist);
  }

  const moveDown = (index) =>{
    const updatedlist = [...listItems]
    let a = updatedlist[index]
    updatedlist[index] = updatedlist[index+1]
    updatedlist[index+1]=a
    setListItems(updatedlist);
  }

  return (
    <div>
      <h2>To Do List</h2>
      <h1 className="date">{formattedDate}</h1>
      <div className="input">

        <input type="text" placeholder="Add a To-Do" onChange={(e) => makeinput(e)} onKeyDown={(e) => keyenter(e)} value={inp} />

        <button className="add" onClick={() => makelist()}>+ ADD</button><br></br><br></br>
        <button className='add' onClick={() => clearlist()}>Clear List</button>
      </div>

      <ul className="ul">

        {listItems.map((item, index) => (
          <li className="li" key={index}>

            <i className={item.isDone ? 'fa-solid fa-circle-check' : 'fa fa-circle-o'} onClick={() => setIsDone(index, item.isDone)}></i>

            {item.editMode ?
              <input type='text' defaultValue={item.value} onChange={(e) => editList(index, e)} />
              :
              <p className={item.isDone ? 'line-through' : ''}>{item.value}</p>}

            <div className='iconcontainer'>
              <i className="fa-solid fa-trash" onClick={() => deleteList(index)}></i>
              <i className='fas fa-edit' onClick={() => setEditMode(index, item.editMode)}></i>
              <i className='fa-solid fa-arrow-up' onClick={() => moveUp(index)}></i>
              <i className='fa-solid fa-arrow-down' onClick={() => moveDown(index)}></i>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;