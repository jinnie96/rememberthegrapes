import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './ListTaskContainer.css'
function ListTasksContainer({user, selectedNewTaskId, selectedList, title, setDueBy, setTitle, updateTitle, updateDate, dueBy, changeNewTaskListId, showTaskDetails, editing, updateTaskTitle, updateNewDate, editTask, editingTask, deleteTask, deleteList}) {
    const dispatch = useDispatch()
    const [showComp, setShowComp] = useState(false)
    const userId= user.id
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")
    const addTask = async (e) => {
        e.preventDefault();
        const dueDate = dueBy.split("T")
        const newTask = {
            user_id: user.id,
            list_id: selectedNewTaskId,
            title: title,
            due_by: dueBy
        }
        const data = await dispatch(addOneTask(newTask));
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

      const listsArr = Object.values(userLists)
      const tasksArr = Object.values(userTasks)

      const taskComplete = async (e) => {
          console.log(e.target.parentElement.childNodes[1].id)
          const compTask = {
              complete: true
          }

          const res = await dispatch(updateOneTask(e.target.parentElement.childNodes[1].id, compTask))
      }

    return (
        <div className="listTasksContainer">
        <div className="deleteBtnList">
            <button id="deleteBtn" onClick = {deleteList}>Delete List</button>
        </div>
        <div className="completeInc">
            <p id="incomp">Incomplete</p>
            <p id="comp">Completed</p>
        </div>
        <form onSubmit={addTask}>
            <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
            <div className="icons">

                <label for="due"><button>Due By</button></label>
                <input id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
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
            {console.log("TASKS ARRE",((tasksArr)), "SELECTED", selectedList)}
            {tasksArr && (tasksArr.map(task => (

                <div className="deleteBtns">
                    {selectedList === null && (
                <div key={task.id}>
                <input type="checkbox"></input>
                <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                Due By: {task.due_by}
                <button id={task.id} className="deleteTaskBtn" onClick={deleteTask} key={task.id}>Delete Task</button>
            </div>
                    )}
                    {console.log("TASKID", task.list_id, "selectedLIST", selectedList)}
                    {task.list_id == selectedList && (
                <div key={task.id}>
                    <input type="checkbox"></input>
                    <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                    {/* Due By: {task.due_by} */}
                    <button id={task.id} onClick={deleteTask} key={task.id}>Delete Task</button>
                    <i onClick={taskComplete} id="completed" class="fa-solid fa-check"></i>
                </div>

                    )}

                </div>

            )))}
        </div>
        </div>

    )
}

export default ListTasksContainer
