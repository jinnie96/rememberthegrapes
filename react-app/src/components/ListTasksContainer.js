import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './ListTaskContainer.css'
function ListTasksContainer({ selectedList, showTaskDetails, deleteList, selectedTaskId, selectedTaskDue, setSelectedTaskDue, deletedTasks, setDeletedTasks}) {
    const dispatch = useDispatch()
    const [showComp, setShowComp] = useState(false)
    const user = useSelector(state => state.session.user)
    const userId= user.id
    const [errors, setErrors] = useState([])
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")
    const [title, setTitle] = useState("")
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")

    const userTasks = useSelector(state => state.task)
    const userLists = useSelector(state => state.list)
    const tasksArr = Object.values(userTasks)
    const listsArr = Object.values(userLists)

    const updateDate = e => {
        setDueBy(e.target.value)
      }

    const updateTitle = e => {
        setTitle(e.target.value)
    }
    const [selectedNewTaskId, setSelectedNewTaskId] = useState(null)

    const changeNewTaskListId = e => {
        if (e === "0") {
          setSelectedNewTaskId(null)
        }
        if (e.target.value === "0") {
          setSelectedNewTaskId(null)
        } else {

          setSelectedNewTaskId(e.target.value)
        }
      }

    const addTask = async (e) => {
        e.preventDefault();
        const newTask = {
            user_id: user.id,
            list_id: selectedNewTaskId,
            title: title,
            due_by: dueBy
        }
        const data = await dispatch(addOneTask(newTask));
        setErrors(data)
        dispatch(getAllTasks(userId))
        setTitle("")
        setDueBy("0000-00-00T00:00")

        taskval.value = ""
        dateval.value = "0000-00-00T00:00"
        const selectTag = document.getElementById("listOptions")
        selectTag.value = 0
        setSelectedNewTaskId(null)
        if (!data) {
            // alert("Task added!")

        }
      };
    console.log(userTasks,"HUHUHUHUHUHUH")
    useEffect(() => {
        (async () => {
            const res = await dispatch(getAllTasks(userId))
            if (res) {
                setDeletedTasks(res.tasks)
            }

        })()
    }, [selectedList, dispatch, errors, selectedTaskDue, setSelectedTaskDue])

      const setIncomplete = e => {
        e.target.style.color ="black"
        e.target.parentElement.childNodes[1].style.color = "#5E44B2"
          setShowComp(false)
      }

      const setComplete = e => {
          e.target.style.color ="black"
          e.target.parentElement.childNodes[0].style.color = "#5E44B2"
          setShowComp(true)
      }

    return (
        <div className="listTasksContainer">
        {selectedList && (

        <div className="deleteBtnList">
            <button id="deleteBtn" onClick = {deleteList}>Delete List</button>
        </div>
        )}
        <div className="completeInc">
            <p onClick = {setIncomplete} id="incomp">Incomplete</p>
            <p onClick = {setComplete} id="comp">Completed</p>
        </div>
        <form onSubmit={addTask}>
        {/* <div> */}
        <div className="formContainer">
        <div id="newTaskInput">
            <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
        </div>
            <div className="icons">

                {/* <label for="due"><button>Due By</button></label> */}
                Due Date: <input name="due_by" id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
                <label defaultValue="null" for="lists"></label>
                List: <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
                {/* <option disabled selected value> select an option </option> */}
                <option value="" selected disabled >Select a list (optional)</option>

                    {/* <option value={0}>None</option> */}
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
        <div className="listContainer">
            {!showComp && (
                <div>

            {tasksArr && (tasksArr.map(task => (
                <div className="deleteBtns">
                    {(selectedList === undefined && task.complete === false) && (
                        <div className="checkboxTitle" onClick={showTaskDetails} id={task.id} key={task.id}>
                    <div className="pointer">
                    <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                    <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                    </div>
                <div className="dltAndCompBtn">
                <p id="date">{new Date(task.due_by).toLocaleString().split(',')[0]}</p>
                {/* <button id={task.id} className="deleteTaskBtn" onClick={deleteTask} key={task.id}>Delete Task</button>
                <i onClick={taskComplete} id="completed" class="fa-solid fa-square-check"></i> */}
                </div>
                </div>
                    )}
                    {(selectedList && task.list_id == selectedList && task.complete === false) && (
                        <div className="checkboxTitle" onClick={showTaskDetails} id={task.id} key={task.id}>
                        <div>
                        <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                        <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                        </div>
                        <div className="dltAndCompBtn">
                        <p id="date">{new Date(task.due_by).toLocaleString().split(',')[0]}</p>
                        {/* <button id={task.id} onClick={deleteTask} class="deleteTaskBtn" key={task.id}>Delete Task</button>
                        <i onClick={taskComplete} id="completed" class="fa-solid fa-square-check"></i> */}
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
                    <div className="checkboxTitle" onClick={showTaskDetails} id={task.id} key={task.id}>
                        <div>
                        <input id="selectedCheck" type="checkbox" checked={task.id === selectedTaskId}></input>
                        <div id={task.id} class="doneTask" onClick={showTaskDetails}>{task.title}</div>
                        </div>
                    {/* Due By: {task.due_by} */}
                    {/* <button id={task.id} className="deleteTaskBtn" onClick={deleteTask} key={task.id}>Delete Task</button> */}
                    </div>
                    )}
                    {(selectedList && task.complete === true && selectedList == task.list_id) && (
                        <div className="checkboxTitle" onClick={showTaskDetails} id={task.id}>
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
