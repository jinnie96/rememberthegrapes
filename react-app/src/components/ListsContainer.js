import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addOneList, getAllLists, updateOneList } from '../store/lists';
import './ListsContainer.css'

function ListsContainer( { setSelectedList, setSelectedListTitle, selectedListId, setSelectedListId, num, setNum, setShowTask, compNum, setCompNum, setSelectedTaskId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const userId = user.id
    const userLists = useSelector(state => state.list)
    const userTasks = useSelector(state => state.task)
    const [newListName, setNewListName] = useState()
    const [newListId, setNewListId] = useState()
    const [errors, setErrors] = useState([])
    const [editErrors, setEditErrors] = useState([])
    const [editingTitle, setEditingTitle] = useState("")
    const [addingList, setAddingList] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [listId, setListId] = useState(null)

    // const [num, setNum] = useState()



          const changeAdding = e => {
          setAddingList(!addingList)
        //   setErrors([])
          }
          const addList = async (e) => {
            e.preventDefault()
            setErrors([])
            const newList = {
                user_id: user.id,
                title: listTitle
            }

            const data = await dispatch(addOneList(newList))
            if (data.errors) {
                setErrors(data.errors)
            }
            dispatch(getAllLists(userId))
            setSelectedListId(data)
            setListTitle("")
            changeAdding()
            removeActiveClass(e)
        }

        const updateListTitle = e => {
            setListTitle(e.target.value)
        }
        const listsArr = Object.values(userLists)
        const tasksArr = Object.values(userTasks)

        const changeSelectedList = e => {
            setShowTask(false)
            setSelectedTaskId(0)
            setSelectedList(e.target.id)
            getSingleListInfo(e.target.id)
            setListId(e.target.id)
        }

        const getSingleListInfo =  async(id) => {
            if (id === "all") {
                const num = tasksArr.filter( task => !task.complete)
                const comp = tasksArr.filter(task => task.complete)
                setNum(num.length)
                setCompNum(comp.length)
            } else {
                const response = await fetch (`/api/lists/${id}`)
                if (response.ok) {
                    const data = await response.json();
                    setSelectedListId(data.id)
                    setSelectedListTitle(data.title)
                    const filterTasks = tasksArr.filter(task => task.list_id == data.id)
                    const num = filterTasks.filter( task => !task.complete)
                    const comp = filterTasks.filter(task => task.complete)
                    setNum(num.length)
                    setCompNum(comp.length)
                    if (data.errors) {
                        return;
                    };
                }
            }
        }


        const changeListNameState = async (e) => {
            setNewListName(e.target.value)
            // setNewListId(e.target.parentElement.parentElement.childNodes[0].id)
        }

        const updateNewList = async(e) => {
            e.preventDefault()
            const list = {
                id: newListId,
                user_id: user.id,
                title: newListName
            }
            const res = await dispatch(updateOneList(newListId, list))
            if (!res) {
                // cancelListChange(e)
                history.push('/')
            }
            if (selectedListId == newListId) {
                setSelectedListTitle(newListName)
            }
            removeActiveClass(e)
            setEditErrors(res)
        }

        const getTasksAll = (e) => {
            setSelectedList(undefined)
            setSelectedListTitle("All Tasks")
            setShowTask(false)

            getSingleListInfo("all")
            // setListId(e.target.id)

        }

        function addActiveClass (e) {
            e.target.parentElement.childNodes[2].classList.add('active')
            setNewListId(e.target.parentElement.childNodes[0].id)
            setEditingTitle(e.target.parentElement.childNodes[0].innerText)
        }

        function removeActiveClass (e) {
            if (e.target.innerText === "Cancel") {
                e.target.parentElement.parentElement.parentElement.classList.remove('active')
            } else {
                e.target.parentElement.parentElement.classList.remove('active')
            }
            setEditingTitle("")
        }

        function addActiveClassAddList (e) {
            e.target.parentElement.childNodes[2].classList.add('active')
            setNewListId(e.target.parentElement.childNodes[0].id)
            setEditingTitle(e.target.parentElement.childNodes[0].innerText)
        }

        function removeActiveClassAddList (e) {
            if (e.target.innerText === "Cancel") {
                e.target.parentElement.parentElement.parentElement.classList.remove('active')
            } else {
                e.target.parentElement.parentElement.classList.remove('active')
            }
            setEditingTitle("")
        }

    return (
        <div className="listsContainer">
            <a href="/">
            <img id ="logoPic" src="https://i.ibb.co/TqP2mD8/imageedit-5-3593153735.jpg" alt="logo"></img>

            </a>
                <div className="lists">
                <p id="inbox">Inbox</p>
                <p id="allTasks" onClick={getTasksAll}>All Tasks</p>
                <hr id="horizLine"></hr>
                <div className="addList">

                <p id="lists">Lists</p><i id="plusfa" class="fa-solid fa-square-plus" onClick={addActiveClassAddList}></i>
                <div className={`modal`}>
                    <div className="modalForm">
                            <form className="editingBtns" onSubmit={addList}>
                            {editErrors?.map((error, ind) => (
                                <li id="errorMsg" key={ind}>{error}</li>
                            ))}
                                <h1 id="renameList">Add a list</h1>
                                <h3 id="listNameText">Please enter a new list name:</h3>
                                <input id="editListInput" value ={listTitle} onChange={updateListTitle} required></input>
                                <button id="saveNewListName" type="submit">Add</button>
                                <button id="cancelNewListName" className="closeModal" onClick={removeActiveClassAddList} type="button">Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
                {/* <button onClick={changeAdding}>Add List</button> */}
                {/* <i className="fa-solid fa-plus"></i> */}
                {/* {addingList && (
                    <form onSubmit={addList}>
                        <input name='title' id="newListInput" placeholder="Enter new list..."type="text" value ={listTitle} onChange={updateListTitle} required></input><br></br>
                        <button id="submitList" type="submit">Submit</button>
                        <i id="addListPlus" onClick={changeAdding} class="fa-solid fa-rectangle-xmark fa-1x"></i>
                    </form>
                )} */}
                <ul className="errors">
                {errors?.map((error, ind) => (
                    <h3 id="errorMsg" key={ind}>{error}</h3>
                    ))}
                    </ul>
                <div className="userLists">
                {listsArr && (listsArr.map(list => (
                    <div>
                        {list.user_id === userId && (
                            <div className="listBtns" id={list.id} onClick={changeSelectedList} key={list.id}>
                                <p id={list.id} onClick={changeSelectedList}>{list.title}</p>
                                <i id ="fa-edit" className="fa-solid fa-pen-to-square" onClick={addActiveClass}></i>
                                 <div className={`modal`}>
                                        <div className="modalForm">
                                            <form id={list.id} className="editingBtns" onSubmit={updateNewList}>
                                            {editErrors?.map((error, ind) => (
                                    <li id="errorMsg" key={ind}>{error}</li>
                                 ))}
                                                <h1 id="renameList">Rename list</h1>
                                                <h3 id="listNameText">List name</h3>
                                                <input id="editListInput" onChange ={changeListNameState} defaultValue={editingTitle} required></input>
                                                <button id="saveNewListName" type="submit">Save</button>
                                                <button id="cancelNewListName" className="closeModal" onClick={removeActiveClass} type="button">Cancel</button>
                                            </form>
                                        </div>
                                 </div>
                                {/* <form id={list.id} className="editingBtns" onSubmit={updateNewList}>

                                    <input id="editListInput" onChange ={changeListNameState} defaultValue = {list.title} required></input>
                                    <button id="updateListName" class="fa-solid fa-square-check" type="submit"></button>
                                    <button id="editListCancelBtn" onClick={cancelListChangeBefore} class="fa-solid fa-rectangle-xmark"></button>
                                </form> */}
                            </div>


                        )}
                    </div>
                )))}
                </div>
                </div>
            </div>
    )
}

export default ListsContainer

{/* <input id="editListInput" name="title" type="text" defaultValue={list.title} value={newListName} onChange ={changeListNameState}></input> */}
{/* <button id="updateListName" class="fa-solid fa-square-check" type="submit" onClick={updateNewList}></button> */}
