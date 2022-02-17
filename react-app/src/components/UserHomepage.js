import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../store/tasks';
import './UserHomepage.css'
// import image from '/images'


function UserHomepage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = useSelector(state => state.session.user.id);
    const userTasks = useSelector(state => state.task)
    const [tasks, setTasks] = useState()
    const [showDate, setShowDate] = useState(false)
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
    const tasksArr = Object.values(userTasks)
    const tasksArray = tasksArr.reverse().reverse();
    const arr = ["a", "b", "c"]
    return (
        <div className="homePage">
            <h1>Welcome {user.firstName}</h1>
            <input placeholder="Add a task.."></input><button>Add</button>
            <div id="icons">
                {/* <img id="dueBy" src="https://img.icons8.com/ios-filled/344/calendar-15.png"></img> */}
                <button>Due By</button>
                {/* <form action="#" class="ws-validate"> */}
    <div class="form-row show-inputbtns">
        <input type="date" data-date-inline-picker="false" data-date-open-on-focus="true" />
    </div>
    {/* <div class="form-row">
        <input type="submit" />
    </div> */}
{/* </form> */}

                <p></p>
            </div>
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
