import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './UserHomepage.css'
import { addOneList, getAllLists, deleteOneList, updateOneList } from '../store/lists';
// import image from '/images'


function UserHomepage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const userId = useSelector(state => state.session.user.id);
    const userTasks = useSelector(state => state.task)
    const userLists = useSelector(state => state.list)
    const state = useSelector(state => state)
    const [tasks, setTasks] = useState()
    const [lists, setLists] = useState()
    const [showDate, setShowDate] = useState(false)
    const [title, setTitle] = useState("")
    const [listTitle, setListTitle] = useState("")
    const [listId, setListId] = useState(null)
    const [editing, setEditing] = useState(false)
    const [newEditTask, setNewEditTask] = useState("")
    const [addingList, setAddingList] = useState(false)
    const [selectedList, setSelectedList] = useState()
    const [selectedListId, setSelectedListId] = useState()
    const [selectedListTitle, setSelectedListTitle] = useState()
    const [selectedTaskId, setSelectedTaskId] = useState()
    const [selectedTaskTitle, setSelectedTaskTitle] = useState("")
    const [selectedTaskDue, setSelectedTaskDue] = useState()
    // const defDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")
    const [newDueBy, setNewDueBy] = useState("0000-00-00T00:00")
    const [num, setNum] = useState()
    const [showTask, setShowTask] = useState(false)
    console.log("STATE@@@@@@@", userLists)

    useEffect(() => {
        // const id = user.id
        (async () => {
            const response = await dispatch(getAllTasks(userId))
            console.log("RESPINSE@@@@@@@", response)
            setTasks(response);
            const responseLists = await dispatch(getAllLists(userId))
            console.log("RESPONSELists", response)
            setLists(responseLists)
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
            due_by: dueBy
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
        console.log(newDueBy, "NEW DUE DATE!!!!!")
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

      const addList = async (e) => {
          e.preventDefault()
          console.log("LISTTITLE", listTitle)
          const newList = {
              user_id: user.id,
              title: listTitle
          }

          const data = dispatch(addOneList(newList))
          dispatch(getAllLists(userId))
          setListTitle("")
          changeAdding()
      }

      const deleteList = async (e) => {
        e.preventDefault()
        console.log("SFSESEFESF", selectedListId)
        await dispatch(deleteOneList(selectedListId))
        dispatch(getAllLists(userId))
      }
      const getSingleListInfo =  async(id) => {
        const response = await fetch (`/api/lists/${id}`)
        // console.log("RES", response.body)
        if (response.ok) {
            const data = await response.json();
            setSelectedListId(data.id)
            setSelectedListTitle(data.title)
            const filterTasks = tasksArr.filter(task => task.list_id == data.id)
            const num = filterTasks.filter( task => task.user_id === userId)
            console.log("nummmmm", num)
            setNum(num.length)
            if (data.errors) {
                return;
            };
        }
        console.log("YOOOO", selectedListTitle)
    }

      const updateListTitle = e => {
          setListTitle(e.target.value)
      }

      const updateDate = e => {
        setDueBy(e.target.value)
      }

      const updateNewDate = e => {
        setNewDueBy(e.target.value)
      }

      const changeAdding = e => {
          setAddingList(!addingList)
      }

      const changeSelectedList = e => {
          console.log("SELECTEDLIST", e.target.id)
          setSelectedList(e.target.id)
          getSingleListInfo(e.target.id)
          setListId(e.target.id)
          console.log("SELECT LIST ID", selectedList)
      }

      const showTaskDetails = async (e) => {
        setShowTask(!showTask)
        console.log("IN SHOWTASK", e.target)
        const response = await fetch (`/api/tasks/${e.target.id}`)
        // console.log("RES", response.body)
        if (response.ok) {
            const data = await response.json();
            console.log("TASK DATAAAA", data)
            setSelectedTaskId(data.id)
            setSelectedTaskTitle(data.task.title)
            setSelectedTaskDue(data.task.due_by)
            // const filterTasks = tasksArr.filter(task => task.list_id == data.id)
            // const num = filterTasks.filter( task => task.user_id === userId)
            // console.log("nummmmm", num)
            // setNum(num.length)
            // if (data.errors) {
            //     return;
            // };
        }

      }
    const tasksArr = Object.values(userTasks)
    const listsArr = Object.values(userLists)
    const tasksArray = tasksArr.reverse().reverse();
    const arr = ["a", "b", "c"]


    return (
        <div className="homePage">
            <div className="listsContainer">
            <h1>Welcome {user.firstName}</h1>
                <p>Inbox</p>
                <button>All Tasks</button>
                <p>Lists:</p><button onClick={changeAdding}>Add List</button>
                {addingList && (
                    <form onSubmit={addList}>
                        <input name='title' placeholder="Enter new list..."type="text" value ={listTitle} onChange={updateListTitle}></input><br></br>
                        <button type="submit">Submit</button>
                        <button onClick={changeAdding}>Cancel</button>
                    </form>
                )}
                {listsArr && (listsArr.map(list => (
                    <div>
                        {list.user_id === userId && (
                            <div id="listBtns" key={list.id}>
                                <button id={list.id} onClick={changeSelectedList}>{list.title}</button>
                            </div>

                        )}
                    </div>
                )))}
            </div>
            <div className="listTasksContainer">
            <form onSubmit={addTask}>
                <input id="taskInput" name='title' type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><button type="submit">Add</button>
                <div id="icons">

                    <label for="due"><button>Due By</button></label>
                    <input id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy}></input>
                    <label for="List">List:</label>
                {/* <div class="showDate">
                    {showDate &&
                    <input type="date" data-date-open-on-focus="false" />
                    }
                </div> */}
                    <p></p>
                </div>
            </form>
            {/* <h1>All tasks: (Replace with Tasks in List Selected)</h1> */}
            <div className="listContainer">
                {console.log("TASKS ARRE",((tasksArr)))}
                {tasksArr && (tasksArr.map(task => (

                    <div>
                        {console.log("TASKID", task.list_id, "selectedLIST", selectedList)}
                        {task.list_id == selectedList && (
                    <div key={task.id}>
                        <input type="checkbox"></input>
                        <div id={task.id} onClick={showTaskDetails}>{task.title}</div> <br></br>
                        Due By: {task.due_by}
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

                        )}

                    </div>

                )))}
                    <div>

                        <button>Edit List</button>
                        <button onClick = {deleteList}>Delete List</button>
                    </div>
            </div>
            </div>
            {showTask && (
                <div className="taskInfoContainer">
                    <p>{selectedListTitle}</p><br></br>
                    <h3>{num} tasks</h3><h3>completed</h3>
                </div>
            )}
            {!showTask && (
                <div>
                    {console.log("FALSE", selectedTaskTitle)}
                    <p>{selectedTaskTitle}</p><br></br>
                    <p>due: {selectedTaskDue}</p>
                    <p>list: {selectedListTitle}</p>
                    {/* <p>due: {selectedTask</p> */}
                </div>
            )}

        </div>
    )

}

export default UserHomepage
