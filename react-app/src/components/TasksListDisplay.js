import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './TasksListDisplay.css'

function TasksListDisplay ( {showTask, selectedListTitle, num, selectedTaskTitle, editingTaskTitle, selectedTaskDue, editingTask, listsArr, selectedTaskId, setShowTask, showTaskDetails, setSelectedTaskTitle, setSelectedTaskDue, setSelectedListTitle, selectedList, setSelectedList, compNum, selectedTaskList}) {
    console.log(selectedTaskId,"moooooooooo")

    const [newTitleVal, setNewTitleVal] = useState("")
    const history = useHistory()
    const [today, setToday] = useState("")
    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task)
    console.log("SHOWWW TASKKK", showTask)
    // console.log("Taaaaaaasks", tasks)
    console.log(typeof(selectedList))
    let complete = 0
    let incomplete = 0
    // useEffect(() => {
    //     (async () => {
            for (const task in tasks) {
                console.log(tasks[task], selectedList,"EEEEEEEEEEEEEEE")
                if (selectedList === undefined) {
                    console.log("UNSELECTED")
                    if (tasks[task].complete) {
                        complete++
                    } else {
                        incomplete++
                    }
                } else {
                    console.log("SELECTED", tasks[task].complete, tasks[task].list_id == (selectedList))
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

    console.log(complete, incomplete)
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
        console.log(e.target)
        console.log(e.target.parentElement.childNodes)
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
        console.log("PARENTTTT", e.target.parentElement)
    }

    const cancelTaskDueChange = (e) => {
        console.log("YOOOOO", e.target)
        e.target.style.display="none"
        e.target.parentElement.childNodes[0].style.display="block"
    }

    const cancelTitleChange = (e) => {
        console.log("ONE", e.target.parentElement.childNodes[0])
        console.log("TWO", e.target.parentElement.childNodes[1])
        // e.target.parentElement.childNodes[0].style.display="block"
        // e.target.parentElement.childNodes[1].style.display="none"

        e.target.style.display = "none"
        e.target.parentElement.childNodes[0].style.display = "none"
        e.target.parentElement.style.display="none"
        e.target.parentElement.parentElement.childNodes[0].style.display = "block"

    }

    const cancelTitleValChange = (e) => {
        e.target.parentElement.childNodes[0].style.display="block"
        e.target.parentElement.childNodes[1].style.display="none"
        e.target.parentElement.childNodes[1].childNodes[0].style.display="none"
        e.target.parentElement.childNodes[1].childNodes[1].style.display="none"
    }

    const editingList = (e) => {
        e.target.style.display="none"
        e.target.parentElement.childNodes[1].style.display="block"
    }

    const editingTitle = (e) => {
        console.log("test", e.target.innerText)
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
        console.log(e.target.value)
        console.log(selectedTaskId)
        const res = await dispatch(updateOneTask(selectedTaskId, newDate))
        console.log(e.target.parentElement.childNodes[0],"HUUUUUUUH")
        console.log("RESSSSS", res.due_by)
        setSelectedTaskDue(new Date(res.due_by).toLocaleString())
        if (res) {
            cancelTaskDueChange(e)
        }
        // setShowTask(!showTask)
        // setShowTask(!showTask)

    }

    const cancelListChange = (e) => {
        console.log(e.target)
        e.target.style.display="none"
        e.target.parentElement.childNodes[0].style.display="block"
    }

    const changeTaskList = async(e) => {
        console.log("YEEEEEEEE", e.target.value == 0)
        // if (e.target.value === "0") {
        //     console.log("ZERO")
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
            console.log("ZERO")
             const newList = {
                 list_id:null
             }
             const res = await dispatch(updateOneTask(selectedTaskId, newList))
             if (res) {
                 console.log(res)
                cancelTitleChange(e)
            }
            setShowTask(!showTask)
            selectedTaskList = res.list_id

        } else {
            const newList = {
                list_id: e.target.value
            }
            const res = await dispatch(updateOneTask(selectedTaskId, newList))
            if (res) {
                cancelTitleChange(e)
            }
            setShowTask(!showTask)
        }


        // setShowTask(!showTask)
    }

    const changeTitleName = async(e) => {
        e.preventDefault()
        console.log("UEEEOOOE", newTitleVal)
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
        console.log("OOOOOOOOO", e.target.value)
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
                            <button type="submit" id="confirmTitle" class="fa-solid fa-square-check">Submit</button>
                        </form>
                    </div>
                    <div className="dueListContainer">
                        <div className="changeDueContainer">
                            <div onClick={editingTaskDue} id="taskdue">due: {selectedTaskDue} Local Time</div>
                            <input id="dueTimeChange" onChange={changeDueTime} type="datetime-local" defaultValue={today}></input>
                        </div>
                        <div className="changeListContainer">
                            <div onClick={editingList} id="listName">list: {selectedTaskList}</div>
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
