import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, getAllTasks } from '../store/tasks';
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
    const [dueBy, setDueBy] = useState("0000-00-00000:00")
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
        console.log("@@@@@@@DATA@@@@@", data)
        // if (data) {
        //   setErrors(data);
        // }
      };

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
                <input name='title' type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><button type="submit">Add</button>
                <div id="icons">

                    <label for="due"><button>Due By</button></label>
                    <input type="datetime-local" onChange={updateDate} value={dueBy} id="due"></input>
                    <button>List:</button>
                <div class="showDate">
                    {showDate &&
                    <input type="date" data-date-open-on-focus="false" />
                    }
                </div>
                    <p></p>
                </div>
            </form>
            <h1>All tasks:</h1>
            <div className="listsContainer">
                {console.log("TASKS ARRE",((tasksArr)))}
                {tasksArr && (tasksArr.map(task => (
                    <p>{task.title}</p>
                )))}
            </div>
        </div>
    )

}

export default UserHomepage
