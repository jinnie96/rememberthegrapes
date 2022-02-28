import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './ListTaskContainer.css'
function ListTasksContainer({user, setSelectedNewTaskId, selectedNewTaskId, selectedList, title, setDueBy, setTitle, updateTitle, updateDate, dueBy, changeNewTaskListId, showTaskDetails, editing, updateTaskTitle, updateNewDate, editTask, editingTask, deleteTask, deleteList, selectedTaskId, selectedTaskDue, setSelectedTaskDue}) {
    const dispatch = useDispatch()
    const [showComp, setShowComp] = useState(false)
    const userId= user.id
    const [errors, setErrors] = useState([])
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")
    const [deletedTasks, setDeletedTasks] = useState([])
    const addTask = async (e) => {
        e.preventDefault();
        const dueDate = dueBy.split("T")
        console.log((selectedNewTaskId ==="0"))
        // if (selectedNewTaskId === "0") {
        //     selectedNewTaskId = null
        // }
        console.log("YOOO", selectedNewTaskId)
        const newTask = {
            user_id: user.id,
            list_id: selectedNewTaskId,
            title: title,
            due_by: dueBy
        }
        const data = await dispatch(addOneTask(newTask));
        console.log("DATAAAA", data)
        setErrors(data)
        dispatch(getAllTasks(userId))
        setTitle("")
        setDueBy("0000-00-00T00:00")
        
        taskval.value = ""
        dateval.value = "0000-00-00T00:00"
        const selectTag = document.getElementById("listOptions")
        selectTag.value = "null"
        // setSelectedNewTaskId(null)
        console.log(selectedNewTaskId)

        // if (data) {
        //   setErrors(data);
        // }
      };
    //   useEffect(() => {
    //     // const id = user.id
    //     (async () => {
    //         dispatch(getAllTasks(userId))
    //     })();
    // }, [listsArr]);
    const taskComplete = async (e) => {
        console.log(e.target.parentElement.childNodes[0].id, "COMPLETE")
        const compTask = {
            complete: true
        }

        const res = await dispatch(updateOneTask(e.target.parentElement.childNodes[0].id, compTask))
        const response = await dispatch(getAllTasks(userId))
        if (res) {
            console.log("updatecheck", res)
        }
        if (response) {
            console.log("ALL", response.tasks)
            setDeletedTasks(response.tasks)
        }
    }
    const userLists = useSelector(state => state.list)
    const userTasks = useSelector(state => state.task)
    useEffect(() => {
        (async () => {
            const res = await dispatch(getAllTasks(userId))
            if (res) {
                console.log("ALLTASKSRES", res.tasks)
                setDeletedTasks(res.tasks)
                console.log("DEEEEEEE", deletedTasks)
            }
            const listsArr = Object.values(userLists)
            const tasksArr = Object.values(userTasks)
            console.log(listsArr)
            console.log(tasksArr)

        })()
    }, [selectedList, dispatch, errors, selectedTaskDue, setSelectedTaskDue])
    // dispatch(getAllTasks(userId))
      console.log(userTasks, "deleteusertasks")
      const listsArr = Object.values(userLists)
      const tasksArr = Object.values(userTasks)
      console.log(listsArr)
      console.log(tasksArr)


      const setIncomplete = e => {
        e.target.style.color ="black"
        e.target.parentElement.childNodes[1].style.color = "#0060bf"
          setShowComp(false)
      }

      const setComplete = e => {
          e.target.style.color ="black"
          e.target.parentElement.childNodes[0].style.color = "#0060bf"
          setShowComp(true)
      }

    return (
        <div className="listTasksContainer">
        <div className="deleteBtnList">
            <button id="deleteBtn" onClick = {deleteList}>Delete List</button>
        </div>
        <div className="completeInc">
            <p onClick = {setIncomplete} id="incomp">Incomplete</p>
            <p onClick = {setComplete} id="comp">Completed</p>
        </div>
        <form onSubmit={addTask}>
        <ul className="errors">
                    {errors?.map((error, ind) => (
                        <li id="errorMsg" key={ind}>{error}</li>
                    ))}
        </ul>
        {/* <div> */}
        <div className="formContainer">
        <div id="newTaskInput">
            <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
        </div>
            <div className="icons">

                {/* <label for="due"><button>Due By</button></label> */}
                <input name="due_by" id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
                <label defaultValue="null" for="lists"></label>
                <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
                <option disabled selected value> select an option </option>

                    <option value={0}>None</option>
                {listsArr && (listsArr.map(list => (

                    <option value={list.id}>{list.title}</option>
                    )))}
                </select>
                <div class="addTaskBtnContainer">
                    <button id="addTaskBtn" type="submit">Add</button>
                </div>
            </div>
                <ul className="errors">
                    {errors?.map((error, ind) => (
                        <h2 id="errorMsg" key={ind}>{error}</h2>
                    ))}
        </ul>
        </div>

        </form>
        {/* <button>Edit List</button> */}
        {/* <h1>All tasks: (Replace with Tasks in List Selected)</h1> */}
        <div className="listContainer">
            {!showComp && (
                <div>

            {tasksArr && (tasksArr.map(task => (
                <div className="deleteBtns">
                    {(selectedList === undefined && task.complete === false) && (
                        <div className="checkboxTitle" key={task.id}>
                        {console.log(task.title, "NULL")}
                    <div>
                    <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                    <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                    </div>
                <div>

                <button id={task.id} className="deleteTaskBtn" onClick={deleteTask} key={task.id}>Delete Task</button>
                <i onClick={taskComplete} id="completed" class="fa-solid fa-check"></i>
                </div>
                </div>
                    )}
                    {(selectedList && task.list_id == selectedList && task.complete === false) && (
                        <div className="checkboxTitle" key={task.id}>
                        <div>
                        {console.log("TASKID", task.id, "selectedLIST", selectedTaskId)}
                        <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                        <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                        </div>
                        <div>
                        <button id={task.id} onClick={deleteTask} key={task.id}>Delete Task</button>
                        <i onClick={taskComplete} id="completed" class="fa-solid fa-check"></i>
                        </div>
                </div>

                    )}

                </div>

            )))}
                </div>
            )}

            {showComp && (
                <div>
                {deletedTasks && (deletedTasks.map(task => (
                    <div>
                {(!selectedList && task.complete === true) && (
                    <div className="checkboxTitle" key={task.id}>
                        <div>
                        <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                        <div id={task.id} class="doneTask" onClick={showTaskDetails}>{task.title}</div>
                        </div>
                    {/* Due By: {task.due_by} */}
                    {/* <button id={task.id} className="deleteTaskBtn" onClick={deleteTask} key={task.id}>Delete Task</button> */}
                    </div>
                    )}
                        {console.log(selectedList, "LISTSELECT", task.list_id, "TASKLISTID", selectedList == task.list_id)}
                    {(selectedList && task.complete === true && selectedList == task.list_id) && (
                        <div className="checkboxTitle">
                            <div>
                            <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                            <div id={task.id} class="doneTask" onClick={showTaskDetails}>{task.title}</div>
                            </div>
                        </div>
                    )}
                    </div>
                )))}
                </div>
            )}



        </div>
        </div>

    )
}

export default ListTasksContainer
