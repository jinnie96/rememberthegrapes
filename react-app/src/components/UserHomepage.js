import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../store/tasks';


function UserHomepage () {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id);
    const userTasks = useSelector(state => state.task)
    const [tasks, setTasks] = useState()
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
        <div className="listsContainer">
            {console.log("TASKS ARRE",((tasksArr)))}
            {tasksArr && (tasksArr.map(task => (
                <p>{task.title}</p>
            )))}
        </div>
    )

}

export default UserHomepage
