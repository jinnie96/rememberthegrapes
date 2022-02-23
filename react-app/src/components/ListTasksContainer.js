import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './ListTaskContainer.css'
function ListTasksContainer({user, selectedNewTaskId, selectedList, title, setDueBy, setTitle, updateTitle, updateDate, dueBy, changeNewTaskListId, showTaskDetails, editing, updateTaskTitle, updateNewDate, editTask, editingTask, deleteTask, deleteList}) {
    const dispatch = useDispatch()
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

    return (
        <div className="listTasksContainer">
        <form onSubmit={addTask}>
            <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
            <div id="icons">

                <label for="due"><button>Due By</button></label>
                <input id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
                <label defaultValue="null" for="lists">List:</label>
                <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
                    <option value="None">None</option>
                {listsArr && (listsArr.map(list => (

                    <option value={list.id}>{list.title}</option>
                    )))}
                </select>
                <p></p>
                    <button type="submit">Add Task</button>
            </div>
            <div>

</div>

        </form>
        {/* <button>Edit List</button> */}
        <button onClick = {deleteList}>Delete List</button>
        {/* <h1>All tasks: (Replace with Tasks in List Selected)</h1> */}
        <div className="listContainer">
            {console.log("TASKS ARRE",((tasksArr)), "SELECTED", selectedList)}
            {tasksArr && (tasksArr.map(task => (

                <div>
                    {console.log("TASKID", task.list_id, "selectedLIST", selectedList)}
                    {task.list_id == selectedList && (
                <div key={task.id}>
                    <input type="checkbox"></input>
                    <div id={task.id} onClick={showTaskDetails}>{task.title}</div>
                    Due By: {task.due_by}
                    {(() => {
                    if (editing) {
                    return (
                        <form>
                            <p>Update Task:</p>
                            <input id= {task.id} name='title' type='text' placeholder="Edit task.." defaultValue={task.title} onChange={updateTaskTitle}></input>
                            <input id="dateInput" type="datetime-local" onChange={updateNewDate} defaultValue={Date.now()} required></input>
                            <button id={task.id} onClick={editTask}>Update</button>
                            <button onClick = {editingTask}>Cancel</button>
                        </form>
                    )
                }
            })()}
            <button id={task.id} onClick={deleteTask} key={task.id}>Delete Task</button>
                </div>

                    )}

                </div>

            )))}
        </div>
        </div>

    )
}

export default ListTasksContainer
