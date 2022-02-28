import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import { addOneList, getAllLists, deleteOneList, updateOneList } from '../store/lists';
import './ListsContainer.css'

function ListsContainer( {user, addingList, setAddingList, selectedNewTaskId, setSelectedNewTaskId, listTitle, setListTitle, selectedList, setSelectedList, listId, setListId, selectedListTitle, setSelectedListTitle, selectedListId, setSelectedListId, num, setNum, setShowTask, compNum, setCompNum, setSelectedTaskId}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = user.id
    const userLists = useSelector(state => state.list)
    const userTasks = useSelector(state => state.task)
    const [newListName, setNewListName] = useState()
    const [newListId, setNewListId] = useState()
    const [errors, setErrors] = useState([])
    const [editErrors, setEditErrors] = useState([])
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

        const cancelListChange = async(e) => {
            // e.target.parentElement.childNodes[0].style.display="block"
            // e.target.parentElement.childNodes[1].style.display="block"
            // e.target.parentElement.childNodes[2].style.display="none"
            // e.target.parentElement.childNodes[3].style.display="none"
            // e.target.parentElement.childNodes[4].style.display="none"
            e.target.parentElement.childNodes[0].style.display="block"
            e.target.parentElement.childNodes[1].style.display="block"
            e.target.childNodes[0].style.display="none"
            e.target.childNodes[1].style.display="none"
            e.target.childNodes[2].style.display="none"
            e.target.style.display="none"
        }

        const cancelListChangeBefore = async (e) => {
            e.target.parentElement.parentElement.childNodes[0].style.display="block"
            e.target.parentElement.parentElement.childNodes[1].style.display="block"
            e.target.parentElement.childNodes[0].style.display="none"
            e.target.parentElement.childNodes[1].style.display="none"
            e.target.parentElement.childNodes[2].style.display="none"
            e.target.parentElement.style.display="none"
            e.target.style.display="none"

        }

        const changeListName = async (e) => {
            // e.target.parentElement.childNodes[0].style.display="none"
            // e.target.parentElement.childNodes[1].style.display="none"
            // e.target.parentElement.childNodes[2].style.display="block"
            // e.target.parentElement.childNodes[3].style.display="block"
            // e.target.parentElement.childNodes[4].style.display="block"

            e.target.parentElement.childNodes[0].style.display="none"
            e.target.parentElement.childNodes[1].style.display="none"
            e.target.parentElement.childNodes[2].style.display="inline-block"
            e.target.parentElement.childNodes[2].childNodes[0].style.display="inline-block"
            e.target.parentElement.childNodes[2].childNodes[1].style.display="inline-block"
            e.target.parentElement.childNodes[2].childNodes[2].style.display="inline-block"

        }

        const changeListNameState = async (e) => {
            setNewListName(e.target.value)
            setNewListId(e.target.parentElement.parentElement.childNodes[0].id)
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
                cancelListChange(e)
                history.push('/')
            }
            setEditErrors(res)
        }

        const getTasksAll = (e) => {
            setSelectedList(undefined)
            setSelectedListTitle("All Tasks")
            setShowTask(false)

            getSingleListInfo("all")
            // setListId(e.target.id)

        }



    return (
        <div className="listsContainer">
            <a href="/">
            <img id ="logoPic" src="https://i.ibb.co/vkFbq2C/RTGlogo.jpg"></img>

            </a>
                <div className="lists">
                <p id="inbox">Inbox</p>
                <p id="allTasks" onClick={getTasksAll}>All Tasks</p>
                <hr id="horizLine"></hr>
                <div className="addList">

                <p id="lists">Lists</p><i id="plusfa" class="fa-solid fa-square-plus" onClick={changeAdding}></i>
                </div>
                {/* <button onClick={changeAdding}>Add List</button> */}
                {/* <i className="fa-solid fa-plus"></i> */}
                {addingList && (
                    <form onSubmit={addList}>
                        <input name='title' id="newListInput" placeholder="Enter new list..."type="text" value ={listTitle} onChange={updateListTitle} required></input><br></br>
                        <button id="submitList" type="submit">Submit</button>
                        <i id="addListPlus" onClick={changeAdding} class="fa-solid fa-rectangle-xmark fa-1x"></i>
                    </form>
                )}
                <ul className="errors">
                {errors?.map((error, ind) => (
                    <h3 id="errorMsg" key={ind}>{error}</h3>
                    ))}
                    </ul>
                <div className="userLists">
                {listsArr && (listsArr.map(list => (
                    <div>
                        {list.user_id === userId && (
                            <div className="listBtns" key={list.id}>
                                <p id={list.id} onClick={changeSelectedList}>{list.title}</p>
                                <i id ="fa-edit" className="fa-solid fa-pen-to-square" onClick={changeListName}></i>
                                    {editErrors?.map((error, ind) => (
                                    <li id="errorMsg" key={ind}>{error}</li>
                                 ))}
                                <form id={list.id} className="editingBtns" onSubmit={updateNewList}>

                                    <input id="editListInput" onChange ={changeListNameState} defaultValue = {list.title} required></input>
                                    <button id="updateListName" class="fa-solid fa-square-check" type="submit"></button>
                                    <button id="editListCancelBtn" onClick={cancelListChangeBefore} class="fa-solid fa-rectangle-xmark"></button>
                                    {/* <input id="editListInput" name="title" type="text" defaultValue={list.title} value={newListName} onChange ={changeListNameState} required></input>
                                    <button id="updateListName" class="fa-solid fa-square-check" type="submit" onClick={updateNewList}></button> */}
                                </form>
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
