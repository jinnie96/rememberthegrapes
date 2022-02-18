import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './UserHomepage.css'
// import image from '/images'


function UserHomepage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = useSelector(state => state.session.user.id);
    const userTasks = useSelector(state => state.task)
    const [tasks, setTasks] = useState()
    const [showDate, setShowDate] = useState(false)
    const [title, setTitle] = useState("")
    const [listId, setListId] = useState(null)
    const [editing, setEditing] = useState(false)
    const [newEditTask, setNewEditTask] = useState("")
    // const defDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")
    const [newDueBy, setNewDueBy] = useState("0000-00-00T00:00")
    console.log("STATE@@@@@@@", userTasks)

    useEffect(() => {
        // const id = user.id
        (async () => {
            const response = await dispatch(getAllTasks(userId))
            console.log("RESPINSE@@@@@@@", response)
            setTasks(response);
            // const tasks = await response.json();
            //   setTasks(tasks);test
        })();
    }, [dispatch]);

    function showCalendar () {
        setShowDate(!showDate)
    }
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")

    const addTask = async (e) => {
        e.preventDefault();
        console.log("DUEEEEE DATEEEE", (dueBy.split('T')))
        const dueDate = dueBy.split("T")
        const newTask = {
            user_id: user.id,
            list_id: listId,
            title: title,
            due_by: dueDate
        }
        console.log("NEWTASK", newTask)
        const data = await dispatch(addOneTask(newTask));
        dispatch(getAllTasks(userId))
        console.log("@@@@@@@DATA@@@@@", data)
        console.log("SEFESFSE", taskval)
        console.log("DATEVAL", dateval)
        setTitle("")
        setDueBy("0000-00-00T00:00")
        taskval.value = ""
        dateval.value = "0000-00-00T00:00"
        // if (data) {
        //   setErrors(data);
        // }
      };

      const deleteTask = async (e) => {
          e.preventDefault()
          console.log("SFSESEFESF", e.target.id)
          await dispatch(deleteOneTask(e.target.id))
          dispatch(getAllTasks(userId))
      }

      const editTask = async (e) => {
        e.preventDefault()
        const task = {
            newEditTask,
            newDueBy
        }
        await dispatch(updateOneTask(e.target.id, task))
      }

      const updateTitle = e => {
          setTitle(e.target.value)
      }
      const updateTaskTitle = e => {
          console.log(e.target.id)
          const updateTitleTag = document.getElementById({e})
          console.log(e)
          setNewEditTask(e.target.value)
        // updateTitleTag.value = e.target.value
      }

      const updateDate = e => {
        setDueBy(e.target.value)
      }

      const updateNewDate = e => {
        setNewDueBy(e.target.value)
      }
    const tasksArr = Object.values(userTasks)
    const tasksArray = tasksArr.reverse().reverse();
    const arr = ["a", "b", "c"]
    return (
        <div className="homePage">
            <h1>Welcome {user.firstName}</h1>
            <form onSubmit={addTask}>
                <input id="taskInput" name='title' type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><button type="submit">Add</button>
                <div id="icons">

                    <label for="due"><button>Due By</button></label>
                    <input id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy}></input>
                    <button>List:</button>
                {/* <div class="showDate">
                    {showDate &&
                    <input type="date" data-date-open-on-focus="false" />
                    }
                </div> */}
                    <p></p>
                </div>
            </form>
            <h1>All tasks:</h1>
            <div className="listsContainer">
                {console.log("TASKS ARRE",((tasksArr)))}
                {tasksArr && (tasksArr.map(task => (
                    <div id = {task.id}key={task.id}>
                        <p>{task.title}</p>
                        <p>Due By: {task.due_by}</p>
                        {/* {!editing ? (
                            <button onClick = {setEditing(!editing)}>Edit</button>
                        ) : (
                            <div>
                            <input id="taskInput" name='title' type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input>
                            <button>Update</button> <button>Cancel</button>
                            <button id={task.id} onClick={deleteTask} key={task.id}>Delete</button>
                            </div>
                        )} */}
                        {(() => {
                        if (!editing) {
                        return (
                            <div>
                            <button onClick = {setEditing(!editing)}>Edit</button>
                            </div>
                        )
                        } else {
                        return (
                            <div>
                                <p>Update Task:</p>
                                <input id= {task.id} name='title' type='text' placeholder="Edit task.." defaultValue={task.title} onChange={updateTaskTitle}></input>
                                <input id="dateInput" type="datetime-local" onChange={updateNewDate} defaultValue={Date.now()}></input>
                                <button id={task.id} onClick={editTask}>Update</button>
                                <button id={task.id} onClick={deleteTask} key={task.id}>Delete</button>
                            </div>
                        )
                        }
                    })()}
                    </div>

                )))}
            </div>
        </div>
    )

}

export default UserHomepage
