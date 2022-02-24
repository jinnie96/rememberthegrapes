import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import { addOneList, getAllLists, deleteOneList, updateOneList } from '../store/lists';
import './ListsContainer.css'

function ListsContainer( {user, addingList, setAddingList, selectedNewTaskId, setSelectedNewTaskId, listTitle, setListTitle, selectedList, setSelectedList, listId, setListId, selectedListTitle, setSelectedListTitle, selectedListId, setSelectedListId, num, setNum, setShowTask}) {
    console.log(listId, "UUUUUUUU")
    const dispatch = useDispatch()
    const userId = user.id
    const userLists = useSelector(state => state.list)
    const userTasks = useSelector(state => state.task)
    const [newListName, setNewListName] = useState()
    const [newListId, setNewListId] = useState()
    const [errors, setErrors] = useState([])
    // const [num, setNum] = useState()



          const changeAdding = e => {
          setAddingList(!addingList)
          }
          const addList = async (e) => {
            e.preventDefault()
            console.log("YOOOOOOOOO")
            const newList = {
                user_id: user.id,
                title: listTitle
            }

            const data = await dispatch(addOneList(newList))
            if (data) {
                console.log("DATUR", data)
            }
            console.log("DATUR", data)
            setErrors(data)
            console.log("HEHE", errors)
            dispatch(getAllLists(userId))
            setListTitle("")
            changeAdding()
        }

        const updateListTitle = e => {
            setListTitle(e.target.value)
        }

        const listsArr = Object.values(userLists)
        const tasksArr = Object.values(userTasks)

        const changeSelectedList = e => {
            console.log("SELECTEDLIST", e.target.id)
            setShowTask(false)
            setSelectedList(e.target.id)
            console.log(selectedList,"EEEEEEE")
            getSingleListInfo(e.target.id)
            setListId(e.target.id)
        }

        const getSingleListInfo =  async(id) => {
            const response = await fetch (`/api/lists/${id}`)
            if (response.ok) {
                const data = await response.json();
                setSelectedListId(data.id)
                console.log("NULLTITLE", data.id)
                setSelectedListTitle(data.title)
                const filterTasks = tasksArr.filter(task => task.list_id == data.id)
                const num = filterTasks.filter( task => task.user_id === userId)
                setNum(num.length)
                if (data.errors) {
                    return;
                };
            }
        }

        const cancelListChange = async(e) => {
            e.target.parentElement.childNodes[0].style.display="block"
            e.target.parentElement.childNodes[1].style.display="block"
            e.target.parentElement.childNodes[2].style.display="none"
            e.target.parentElement.childNodes[3].style.display="none"
            e.target.parentElement.childNodes[4].style.display="none"

        }

        const changeListName = async (e) => {
            console.log(e.target.parentElement.childNodes[3])
            e.target.parentElement.childNodes[0].style.display="none"
            e.target.parentElement.childNodes[1].style.display="none"
            e.target.parentElement.childNodes[2].style.display="block"
            e.target.parentElement.childNodes[3].style.display="block"
            e.target.parentElement.childNodes[4].style.display="block"
        }

        const changeListNameState = async (e) => {
            console.log(e.target.value)
            console.log(e.target.parentElement.childNodes[0].id)
            setNewListName(e.target.value)
            setNewListId(e.target.parentElement.childNodes[0].id)
        }

        const updateNewList = async(e) => {
            console.log(e.target.parentElement.childNodes[0].id)
            console.log(newListId)
            const list = {
                id: newListId,
                user_id: user.id,
                title: newListName
            }
            console.log(list)
            const res = dispatch(updateOneList(newListId, list))
            if (res) {
                cancelListChange(e)
            }
        }

        const getTasksAll = (e) => {
            setSelectedList(undefined)
            setSelectedListTitle("All Tasks")
        }



    return (
        <div className="listsContainer">
            {console.log(tasksArr, "TASKS")}
            <h1>Remember the ???</h1>
                <p id="inbox">Inbox</p>
                <p id="allTasks" onClick={getTasksAll}>All Tasks</p>
                <div className="addList">

                <p id="lists">Lists:</p><i id="plusfa" class="fa-solid fa-plus" onClick={changeAdding}></i>
                </div>
                {/* <button onClick={changeAdding}>Add List</button> */}
                {/* <i className="fa-solid fa-plus"></i> */}
                {errors?.map((error, ind) => (
                    <li id="errorMsg" key={ind}>{error}</li>
                ))}
                {addingList && (
                    <form onSubmit={addList}>
                        <ul className="errors">
                     </ul>
                        <input name='title' placeholder="Enter new list..."type="text" value ={listTitle} onChange={updateListTitle} required></input><br></br>
                        <button type="submit">Submit</button>
                        <i id="addListPlus" onClick={changeAdding} class="fa-solid fa-rectangle-xmark"></i>
                    </form>
                )}
                <div className="userLists">
                {listsArr && (listsArr.map(list => (
                    <div>
                        {list.user_id === userId && (
                            <div className="listBtns" key={list.id}>
                                <p id={list.id} onClick={changeSelectedList}>{list.title}</p>
                                <i id ="fa-edit" className="fa-solid fa-pen-to-square" onClick={changeListName}></i>
                                <input id="editListInput" onChange ={changeListNameState} defaultValue = {list.title}></input>
                                <i id="updateListName" class="fa-solid fa-square-check" onClick={updateNewList}></i>
                                <i id="editListCancelBtn" onClick={cancelListChange} class="fa-solid fa-rectangle-xmark"></i>
                            </div>

                        )}
                    </div>
                )))}
                </div>
            </div>
    )
}

export default ListsContainer
