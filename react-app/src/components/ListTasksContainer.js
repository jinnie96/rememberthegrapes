import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './ListTaskContainer.css'
function ListTasksContainer({user, selectedNewTaskId, selectedList, title, setDueBy, setTitle, updateTitle, updateDate, dueBy, changeNewTaskListId, showTaskDetails, editing, updateTaskTitle, updateNewDate, editTask, editingTask, deleteTask, deleteList, selectedTaskId}) {
    const dispatch = useDispatch()
    const [showComp, setShowComp] = useState(false)
    const userId= user.id
    const [errors, setErrors] = useState([])
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")
    const addTask = async (e) => {
        e.preventDefault();
        const dueDate = dueBy.split("T")
        console.log("DUEDATE", dueBy)
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
        // if (data) {
        //   setErrors(data);
        // }
      };
      const userLists = useSelector(state => state.list)
      const userTasks = useSelector(state => state.task)
      console.log(selectedTaskId, "OINK")
      const listsArr = Object.values(userLists)
      const tasksArr = Object.values(userTasks)

      const taskComplete = async (e) => {
          console.log(e.target.parentElement.childNodes[0].id, "COMPLETE")
          const compTask = {
              complete: true
          }

          const res = await dispatch(updateOneTask(e.target.parentElement.childNodes[0].id, compTask))
      }

      const setIncomplete = e => {
          setShowComp(false)
      }

      const setComplete = e => {
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
            <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
            <div className="icons">

                <label for="due"><button>Due By</button></label>
                <input name="due_by" id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
                <label defaultValue="null" for="lists"></label>
                <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
                <option disabled selected value> select an option </option>

                    <option value="None">None</option>
                {listsArr && (listsArr.map(list => (

                    <option value={list.id}>{list.title}</option>
                    )))}
                </select>
                <div class="addTaskBtnContainer">
                    <button id="addTaskBtn" type="submit">Add Task</button>
                </div>
            </div>
            <div>

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
                        {console.log(selectedList, "NULL")}
                    <div>
                    <input type="checkbox" checked={task.id === selectedTaskId}></input>
                    <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                    </div>
                {/* Due By: {task.due_by} */}
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
                        <input type="checkbox" checked={task.id === selectedTaskId}></input>
                        <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                        </div>
                        {/* Due By: {task.due_by} */}
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
                {tasksArr && (tasksArr.map(task => (
                    <div>
                {(!selectedList && task.complete === true) && (
                    <div className="checkboxTitle" key={task.id}>
                        <div>
                        <input type="checkbox" checked={task.id === selectedTaskId}></input>
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
                            <input type="checkbox" checked={task.id === selectedTaskId}></input>
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
