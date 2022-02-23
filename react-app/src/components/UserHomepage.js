import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './UserHomepage.css'
import { addOneList, getAllLists, deleteOneList, updateOneList } from '../store/lists';
import ListsContainer from './ListsContainer';
import ListTasksContainer from './ListTasksContainer'
import TasksListDisplay from './TasksListDisplay'


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
    const [selectedNewTaskId, setSelectedNewTaskId] = useState()
    const [selectedListTitle, setSelectedListTitle] = useState()
    const [selectedTaskId, setSelectedTaskId] = useState()
    const [selectedTaskTitle, setSelectedTaskTitle] = useState("")
    const [selectedTaskDue, setSelectedTaskDue] = useState()
    // const defDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")
    const [newDueBy, setNewDueBy] = useState("0000-00-00T00:00")
    const [num, setNum] = useState()
    const [showTask, setShowTask] = useState(false)
    console.log("STATE@@@@@@@", selectedList)

    useEffect(() => {
        // const id = user.id
        (async () => {
            const response = await dispatch(getAllTasks(userId))
            setTasks(response);
            const responseLists = await dispatch(getAllLists(userId))
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

      const deleteTask = async (e) => {
          e.preventDefault()
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
        setEditing(false)
      }

      const updateTitle = e => {
          setTitle(e.target.value)
      }
      const updateTaskTitle = e => {
          console.log(e.target.id)
          const updateTitleTag = document.getElementById({e})
          console.log(e)
          setNewEditTask(e.target.value)
      }

      const deleteList = async (e) => {
        e.preventDefault()
        await dispatch(deleteOneList(selectedListId))
        dispatch(getAllLists(userId))
        setShowTask(false)
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

      const changeNewTaskListId = e => {
        setSelectedNewTaskId(e.target.value)
      }

      const showTaskDetails = async (e) => {
        setShowTask(!showTask)
        console.log("IN SHOWTASK", e.target)
        const response = await fetch (`/api/tasks/${e.target.id}`)
        // console.log("RES", response.body)
        if (response.ok) {
            const data = await response.json();
            console.log("DATABOI", data.task.id)
            setSelectedTaskId(data.task.id)
            console.log("HEHEHEHEHEEHEHEHE", data.task.title)
            setSelectedTaskTitle(data.task.title)
            setSelectedTaskDue(data.task.due_by)
        }

      }

        const editingTaskTitle = (e) => {
            const titleInput = document.getElementById("taskTitleName")
            titleInput.innerHTML = `<input name='title' type='text' value=${selectedTaskTitle} onChange={updateTaskTitle}></input>`
        }

      const editingTask = async (e) => {
          setEditing(!editing)

      }
      console.log("USERTASKS", userTasks)
      console.log("USERLISTS", userLists)
    const tasksArr = Object.values(userTasks)
    const listsArr = Object.values(userLists)
      console.log(tasksArr)
      console.log(listsArr)
    const listName = document.getElementById("Weekendlist")
    const editListBtn = document.getElementById("editListBtn")
    const listInput = document.getElementById("editListInput")
    const cancelListName = document.getElementById("editListCancelBtn")
    // cancelListName.innerText = "Cancel"
    const cancelListChange = async(e) => {
        cancelListName.style.display="none"
        listInput.style.display="none"
        editListBtn.style.display = "block"
        listName.style.display = "block"
    }
    console.log(selectedTaskId,"UOOOOOOOOOOO")
    console.log(selectedTaskTitle,"sup")

    return (
        <div className="homePage">
            <ListsContainer user={user} addingList={addingList} setAddingList={setAddingList} selectedNewTaskId={selectedNewTaskId} setSelectedNewTaskId={setSelectedNewTaskId} listTitle={listTitle} setListTitle={setListTitle} selectedList={selectedList} setSelectedList={setSelectedList} listId={listId} setListId={setListId} selectedListTitle={selectedListTitle} setSelectedListTitle={setSelectedListTitle} selectedListId={selectedListId} setSelectedListId={setSelectedListId} num={num} setNum={setNum} />
            <ListTasksContainer user={user} selectedNewTaskId={selectedNewTaskId} setTitle={setTitle} setDueBy={setDueBy} title={title} updateTitle={updateTitle} updateDate={updateDate} dueBy={dueBy} changeNewTaskListId={changeNewTaskListId} listsArr={listsArr} tasksArr={tasksArr} selectedList={selectedList} showTaskDetails={showTaskDetails} editing={editing} updateTaskTitle = {updateTaskTitle} updateNewDate={updateNewDate} editTask = {editTask} editingTask = {editingTask} deleteTask={deleteTask} deleteList={deleteList} userTasks={userTasks} userLists={userLists}/>
            <TasksListDisplay showTask={showTask} selectedListTitle={selectedListTitle} num={num} selectedTaskTitle={selectedTaskTitle} editingTaskTitle={editingTaskTitle} selectedTaskDue={selectedTaskDue} editingTask={editingTask} listsArr={listsArr} selectedTaskId={selectedTaskId}/>
        </div>
    )

}

export default UserHomepage
