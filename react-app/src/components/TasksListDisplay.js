import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateOneTask, getAllTasks, deleteOneTask } from '../store/tasks';
import './TasksListDisplay.css'

function TasksListDisplay ( {showTask, selectedListTitle, selectedTaskTitle, selectedTaskDue, selectedTaskId, setShowTask, setSelectedTaskTitle, setSelectedTaskDue, selectedList, selectedTaskList, setDeletedTasks}) {

    const [newTitleVal, setNewTitleVal] = useState("")
    const [today, setToday] = useState("")
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task)
    const user = useSelector(state => state.user)
    const userId = useSelector(state => state.session.user.id);
    const userTasks = useSelector(state => state.task)
    const userLists = useSelector(state => state.list)
    const tasksArr = Object.values(userTasks)
    const listsArr = Object.values(userLists)

    let complete = 0
    let incomplete = 0
    // useEffect(() => {
    //     (async () => {
            for (const task in tasks) {
                if (selectedList === undefined) {
                    if (tasks[task].complete) {
                        complete++
                    } else {
                        incomplete++
                    }
                } else {
                    if (tasks[task].complete && tasks[task].list_id == (selectedList)) {
                        complete++
                    }
                    if (!tasks[task].complete && tasks[task].list_id == (selectedList)) {
                        incomplete++
                    }
                }
            }
    //             })()
    // }, [selectedList, dispatch])

    function getToday() {
        const date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }

        const today = year + "-" + month + "-" + day +"T00:00";
        setToday(today)

    }
        useEffect(() => {
            if (showTask) {
                const selectedTask = document.querySelector(".taskSelectedInfoContainer")
                    selectedTask.classList.remove("taskSelectedInfoContainer")
                    selectedTask.classList.add("taskSelectedInfoContainerShift")
            }
            if (!showTask && document.querySelector(".taskSelectedInfoContainerShift")) {
                    const selectedTask = document.querySelector(".taskSelectedInfoContainerShift")
                        selectedTask.classList.remove("taskSelectedInfoContainerShift")
                        selectedTask.classList.add("taskSelectedInfoContainer")
            }

        }, [showTask])
    window.onload = function () {
        if (showTask) {
            const selectedTask = document.querySelector(".taskSelectedInfoContainer")
            // if (showTask) {
                selectedTask.classList.remove("taskSelectedInfoContainer")
                selectedTask.classList.add("taskSelectedInfoContainerShift")
            // } else {
            //     // selectedTask.style.marginLeft = "0"
            // }
        }

    }

    const deleteTask = async (e) => {
        e.preventDefault()
        await dispatch(deleteOneTask(selectedTaskId))
        console.log("EEEEEEEEEEEEEEEE@#@$@@$@$@$", e.target)
        dispatch(getAllTasks(userId))
        setShowTask(false)
        window.location.href = "localhost:3003"
    }

    const editingTaskDue = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[2].style.display="block"
    }

    const cancelTaskDueChange = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
    }

    const cancelTitleValChange = (e) => {
        e.target.parentElement.childNodes[0].style.display="block"
        e.target.parentElement.childNodes[1].style.display="none"
        e.target.parentElement.childNodes[1].childNodes[0].style.display="none"
        e.target.parentElement.childNodes[1].childNodes[1].style.display="none"
    }

    const editingList = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[2].style.display="block"
    }

    const editingTitle = (e) => {
        setNewTitleVal(e.target.innerText)
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
        e.target.parentElement.childNodes[1].childNodes[0].style.display="block"
        e.target.parentElement.childNodes[1].childNodes[1].style.display="block"

    }

    const changeDueTime = async(e) => {
        const newDate = {
            due_by: e.target.value
        }
        const res = await dispatch(updateOneTask(selectedTaskId, newDate))
        setSelectedTaskDue(new Date(res.due_by).toLocaleString())
        if (res) {
            cancelTaskDueChange(e)
        }
    }

    const cancelListChange = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
    }

    const changeTaskList = async(e) => {
        if (e.target.value == 0) {
             const newList = {
                 list_id:null
             }
             const res = await dispatch(updateOneTask(selectedTaskId, newList))
             if (res) {
                cancelListChange(e)
            }
            setShowTask(!showTask)
            selectedTaskList = res.list_id
            // alert("list updated!")

        } else {
            const newList = {
                list_id: e.target.value
            }
            const res = await dispatch(updateOneTask(selectedTaskId, newList))
            if (res) {
                cancelListChange(e)
            }
            setShowTask(!showTask)
            // alert("list updated!")
            // setSelectedList(e.target.id)
        }


        // setShowTask(!showTask)
    }

    const changeTitleName = async(e) => {
        e.preventDefault()
        const newTitle = {
            title: newTitleVal
        }
        setSelectedTaskTitle(newTitleVal)

        const res = await dispatch(updateOneTask(selectedTaskId, newTitle))
        if (res) {
            cancelTitleValChange(e)
        }
    }

    const setTitleVal = (e) => {
        setNewTitleVal(e.target.value)
    }

    const taskComplete = async (e) => {
        const compTask = {
            complete: true
        }
        const res = await dispatch(updateOneTask(e.target.id, compTask))
        const response = await dispatch(getAllTasks(userId))
        // if (res) {
        // }
        if (response) {
            setDeletedTasks(response.tasks)
            setShowTask(false)

        }
    }

    const editingTaskTitle = (e) => {
        const titleInput = document.getElementById("taskTitleName")
        titleInput.innerHTML = `<input name='title' type='text' value=${selectedTaskTitle} onChange={updateTaskTitle}></input>`
    }

    window.addEventListener("click", getToday);

    return (
            <div className="tasksListsDisplay">

            {!showTask && (
                <div className="taskInfoContainer">
                    <div className="unshowContainer">
                    <p>{selectedListTitle}</p><br></br>
                    <div className="incCompleteTasks">
                        <div class="completedNum">
                            <h3 id="complete">{incomplete}</h3>
                            <h3 id="tasksText">tasks</h3>
                        </div>
                        <div className="incompletedNum">
                            <h3 id="incomplete"> {complete}</h3>
                            <h3 id="completedText">completed</h3>
                        </div>
                    </div>
                    </div>
                    <div className="footer">
                        <footer>
                        © 2022 Remember The Grapes
                        </footer>
                    </div>

                </div>
            )}
            {showTask && (
                <div class="taskSelectedInfoContainer">
                    <div className="showContainer" id ="animation">
                    <div className="changeTitleContainer">
                        <div id="titlename" onClick={editingTitle}>{selectedTaskTitle}</div>
                        <form onSubmit={changeTitleName}>
                            <input id="titleChange" name="title" defaultValue={selectedTaskTitle} onChange={setTitleVal} value={newTitleVal} required></input>
                            <button type="submit" id="confirmTitleBtn" >Update</button>
                        </form>
                    </div>
                    <div className="dueListContainer">
                        <div className="changeDueContainer">
                            <div class="editingDue">
                                <div id="dueText">due: </div>
                                <div onClick={editingTaskDue} id="taskdue">{selectedTaskDue} Local Time</div>
                                <input id="dueTimeChange" onChange={changeDueTime} type="datetime-local" defaultValue={today}></input>
                            </div>
                        </div>
                        <div className="changeListContainer">
                            <div id="listText">list: </div>
                            <div onClick={editingList} id="listName">{selectedTaskList}</div>
                            <select defaultValue="none" name="lists" id="newListOptions" onChange={changeTaskList}>
                            <option disabled selected hidden value> -- select an option (optional) -- </option>
                            {/* <option value="none" selected disabled hidden>Select an Option</option> */}
                                <option value={selectedTaskId}>{selectedTaskList}</option>
                                <option value="0">None</option>
                                    {listsArr && (listsArr.map(list => (
                                        <option value={list.id}>{list.title}</option>
                                    )))}
                            </select>
                        </div>
                    </div>
                    <div className="compDelBtns">
                        <button id="deleteTaskBtn" onClick={deleteTask} className="deleteTaskBtn" class="fa-solid">Delete Task</button>
                        <button id = {selectedTaskId} onClick={taskComplete} className="completeTaskBtn">Task Complete</button>
                    </div>
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
