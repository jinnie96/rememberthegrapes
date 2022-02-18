import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks } from '../store/tasks';
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
    const today = new Date()
    // const defDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")
    console.log("STATE@@@@@@@", userTasks)

    useEffect(() => {
        // const id = user.id
        (async () => {
            const response = await dispatch(getAllTasks(userId))
            console.log("RESPINSE@@@@@@@", response)
            setTasks(response);
            // const tasks = await response.json();
            //   setTasks(tasks);
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

      const updateTitle = e => {
          setTitle(e.target.value)
      }

      const updateDate = e => {
          setDueBy(e.target.value)
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
                        <button>Edit</button>
                        <button id={task.id} onClick={deleteTask} key={task.id}>Delete</button>
                    </div>

                )))}
            </div>
        </div>
    )

}

export default UserHomepage
