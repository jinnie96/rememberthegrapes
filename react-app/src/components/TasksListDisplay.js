import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { updateOneTask } from '../store/tasks';
import './TasksListDisplay.css'

function TasksListDisplay ( {showTask, selectedListTitle, num, selectedTaskTitle, editingTaskTitle, selectedTaskDue, editingTask, listsArr, selectedTaskId, setShowTask, showTaskDetails, setSelectedTaskTitle, setSelectedTaskDue, setSelectedListTitle, selectedList, setSelectedList, compNum, selectedTaskList}) {

    const [newTitleVal, setNewTitleVal] = useState("")
    const [today, setToday] = useState("")
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task)
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


        // e.target.style.display="none"
        // e.target.parentElement.childNodes[1].style.display="block"
        // e.target.parentElement.childNodes[2].style.display="block"
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
        // setShowTask(!showTask)
        // setShowTask(!showTask)

    }

    const cancelListChange = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
    }

    const changeTaskList = async(e) => {
        // if (e.target.value === "0") {
        //      const newList = {
        //          list_id:undefined
        //      }
        //      const res = await dispatch(updateOneTask(selectedTaskId, newList))
        //      if (res) {
        //         cancelListChange(e)
        //     }
        //     setShowTask(!showTask)

        // } else {
        //     const newList = {
        //         list_id: e.target.value
        //     }
        //     const res = await dispatch(updateOneTask(selectedTaskId, newList))
        //     setSelectedListTitle(res.title)
        //     if (res) {
        //         console.log("EDIT LIST", res)
        //         cancelListChange(e)
        //     }
        //     // setShowTask(showTask)
        //     // setSelectedList("All Tasks")
        //     // setSelectedListTitle(res.title)

        // }
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
            console.log(selectedList, (e.target.id))
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
        // showTaskDetails(e)
        // setShowTask(false)
        // setShowTask(true)
    }

    const setTitleVal = (e) => {
        setNewTitleVal(e.target.value)
    }

    // console.log("YOIOOYOYOYOYOYOYOY", selectedTaskDue.toUTCString())


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
                    <div className="showContainer">
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
