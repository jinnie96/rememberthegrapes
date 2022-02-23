import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './TasksListDisplay.css'

function TasksListDisplay ( {showTask, selectedListTitle, num, selectedTaskTitle, editingTaskTitle, selectedTaskDue, editingTask, listsArr, selectedTaskId}) {
    console.log(selectedTaskId,"moooooooooo")

    const [newTitleVal, setNewTitleVal] = useState("")

    const dispatch = useDispatch()
    console.log("SHOWWW TASKKK", showTask)

    function windowOnClick(event) {
        return
    }

    const editingTaskDue = (e) => {
        console.log(e.target)
        console.log(e.target.parentElement.childNodes)
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
        console.log("PARENTTTT", e.target.parentElement)
    }

    const cancelTitleChange = (e) => {
        console.log("ONE", e.target.parentElement.childNodes[0])
        console.log("TWO", e.target.parentElement.childNodes[1])
        e.target.parentElement.childNodes[0].style.display="block"
        e.target.parentElement.childNodes[1].style.display="none"
    }

    const cancelTitleValChange = (e) => {
        e.target.parentElement.childNodes[0].style.display="block"
        e.target.parentElement.childNodes[1].style.display="none"
        e.target.parentElement.childNodes[2].style.display="none"
    }

    const editingList = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
    }

    const editingTitle = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
        e.target.parentElement.childNodes[2].style.display="block"
    }

    const changeDueTime = (e) => {
        const newDate = {
            due_by: e.target.value
        }
        console.log(e.target.value)
        console.log(selectedTaskId)
        const res = dispatch(updateOneTask(selectedTaskId, newDate))
        console.log(e.target.parentElement.childNodes[0],"HUUUUUUUH")
        if (res) {
            cancelTitleChange(e)
        }
    }

    const changeTaskList = (e) => {
        const newList = {
            list_id: e.target.value
        }

        const res = dispatch(updateOneTask(selectedTaskId, newList))

        if (res) {
            cancelTitleChange(e)
        }
    }

    const changeTitleName = (e) => {
        const newTitle = {
            title: newTitleVal
        }

        const res = dispatch(updateOneTask(selectedTaskId, newTitle))
        if (res) {
            cancelTitleValChange(e)
        }
    }

    const setTitleVal = (e) => {
        console.log(e.target.value)
        setNewTitleVal(e.target.value)
    }


    window.addEventListener("click", windowOnClick);

    return (
            <div className="tasksListsDisplay">

            {!showTask && (
                <div className="taskInfoContainer">
                    <p>{selectedListTitle}</p><br></br>
                    <h3>{num} tasks</h3><h3>completed</h3>
                </div>
            )}
            {showTask && (
                <div class="taskSelectedInfoContainer">
                    <div className="editBtn">
                        <button className="editTask" id="editTaskBtn">Edit Task</button>
                    </div>
                    <div>
                        <div id="titlename" onClick={editingTitle}>{selectedTaskTitle}</div>
                        <input id="titleChange" name="title" defaultValue={selectedTaskTitle} onChange={setTitleVal}></input>
                        <i id="confirmTitle" onClick={changeTitleName} class="fa-solid fa-square-check"></i>
                    </div>
                    <div>
                        <div onClick={editingTaskDue} id="taskdue">due:{selectedTaskDue}</div>
                        <input id="dueTimeChange" onChange={changeDueTime} type="datetime-local" value={selectedTaskDue}></input>
                    </div>
                    <div>
                        <div onClick={editingList} id="listName">list: {selectedListTitle}</div>
                        <select name="lists" id="newListOptions" onChange={changeTaskList}>
                            <option value="None">None</option>
                                {listsArr && (listsArr.map(list => (
                                    <option value={list.id}>{list.title}</option>
                                )))}
                        </select>
                    </div>

                </div>
                )}
                </div>
    )
}

export default TasksListDisplay

{/* <p onClick = {editingTaskTitle} id="taskTitleName">{selectedTaskTitle}</p><br></br>
<p>{selectedTaskTitle}</p>
<input name='title' type='text' defaultValue={selectedTaskTitle} onChange={updateTaskTitle}></input> */}
