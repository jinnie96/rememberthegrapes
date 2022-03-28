import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
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
    const [showDate, setShowDate] = useState(false)
    // const [title, setTitle] = useState("")
    const [editing, setEditing] = useState(false)
    const [newEditTask, setNewEditTask] = useState("")
    const [selectedList, setSelectedList] = useState()
    const [selectedListId, setSelectedListId] = useState()
    const [selectedListTitle, setSelectedListTitle] = useState("All Tasks")
    const [selectedTaskId, setSelectedTaskId] = useState()
    const [selectedTaskTitle, setSelectedTaskTitle] = useState("")
    const [selectedTaskDue, setSelectedTaskDue] = useState()
    const [selectedTaskList, setSelectedTaskList] = useState()
    // const defDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const [dueBy, setDueBy] = useState("0000-00-00T00:00")
    const [newDueBy, setNewDueBy] = useState("0000-00-00T00:00")
    const [num, setNum] = useState()
    const [showTask, setShowTask] = useState(false)
    const [compNum, setCompNum] = useState()
    const [deletedTasks, setDeletedTasks] = useState([])


    useEffect(() => {
        // const id = user.id
        (async () => {
            const response = await dispatch(getAllTasks(userId))
            // setTasks(response.json);
            const responseLists = await dispatch(getAllLists(userId))
            // setLists(responseLists)
            // const tasks = await response.json();
            //   setTasks(tasks);test
        })();
    }, [dispatch]);

    useEffect(() => {
      const num = tasksArr.filter( task => !task.complete)
      const comp = tasksArr.filter(task => task.complete)
      setNum(num.length)
      setCompNum(comp.length)

    }, [dispatch])

    function showCalendar () {
        setShowDate(!showDate)
    }
    const taskval = document.getElementById("taskInput")
    const dateval = document.getElementById("dateInput")

      const deleteTask = async (e) => {
          e.preventDefault()
          console.log("HEEEEEEEEE", selectedTaskId)
          await dispatch(deleteOneTask(selectedTaskId))
          dispatch(getAllTasks(userId))
          setShowTask(false)
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

      const updateTaskTitle = e => {
          const updateTitleTag = document.getElementById({e})
          setNewEditTask(e.target.value)
      }
      const deleteList = async (e) => {
        e.preventDefault()
        const res = await dispatch(deleteOneList(selectedListId))
        window.location.href = '/'
        await dispatch(getAllTasks(userId))
        // await dispatch(deleteOneTask(selectedListId))

        .then
          setSelectedList(1)
          setSelectedList(undefined)
          setSelectedListTitle("All Tasks")
          setShowTask(false)
          const num = tasksArr.filter( task => !task.complete)
          const comp = tasksArr.filter(task => task.complete)
          setNum(num.length)
          setCompNum(comp.length)
          // dispatch(getAllTasks(userId))
          await dispatch(getAllTasks(userId))
      }
      // const num = tasksArr.filter( task => !task.complete)
      // const comp = tasksArr.filter(task => task.complete)
      // num.map(task => console.log(task))
      // setNum(num.length)
      // setCompNum(comp.length)

      // const updateListTitle = e => {
      //     setListTitle(e.target.value)
      // }


      const updateNewDate = e => {
        setNewDueBy(e.target.value)
      }


      const showTaskDetails = async (e) => {
        setShowTask(true)
        if (e.target.id == selectedTaskId) {
          setSelectedTaskId(0)
          setShowTask(false)
          // e.target.style.fontWeight = "400"
        } else {
          // e.target.style.fontWeight = "bold"
          const response = await fetch (`/api/tasks/${e.target.id}`)
          if (response.ok) {
              const data = await response.json();
              setSelectedTaskId(data.task.id)
              if (!data.task.list_id) {
                // setSelectedListTitle("null")
                setSelectedTaskList("None")
              } else {
                fetchOneList(data.task.list_id)

              }
              // const listTitle = await fetch(`api/lists/${data.task.list_id}`)
              // console.log("LISSSSS", listTitle.json())
              setSelectedTaskTitle(data.task.title)
              setSelectedTaskDue(new Date(data.task.due_by).toLocaleString())
          }
        }

      }

      const fetchOneList = async(e) => {
        const listTitle = await fetch(`api/lists/${e}`)
        if (listTitle.ok) {
          const data = await listTitle.json()
          setSelectedTaskList(data.title)

        }
      }

        const editingTaskTitle = (e) => {
            const titleInput = document.getElementById("taskTitleName")
            titleInput.innerHTML = `<input name='title' type='text' value=${selectedTaskTitle} onChange={updateTaskTitle}></input>`
        }

      const editingTask = async (e) => {
          setEditing(!editing)

      }
    const tasksArr = Object.values(userTasks)
    const listsArr = Object.values(userLists)
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

    return (
        <div className="homePage">
            <ListsContainer selectedList={selectedList} setSelectedList={setSelectedList} selectedListTitle={selectedListTitle} setSelectedListTitle={setSelectedListTitle} selectedListId={selectedListId} setSelectedListId={setSelectedListId} num={num} setNum={setNum} setShowTask={setShowTask} compNum={compNum} setCompNum={setCompNum} setSelectedTaskId={setSelectedTaskId}/>
            <ListTasksContainer selectedList={selectedList} showTaskDetails={showTaskDetails} deleteList={deleteList} selectedTaskId={selectedTaskId} selectedTaskDue={selectedTaskDue} setSelectedTaskDue={setSelectedTaskDue} deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks}/>
            <TasksListDisplay showTask={showTask} selectedListTitle={selectedListTitle} num={num} selectedTaskTitle={selectedTaskTitle} editingTaskTitle={editingTaskTitle} selectedTaskDue={selectedTaskDue} editingTask={editingTask} listsArr={listsArr} selectedTaskId={selectedTaskId} setShowTask={setShowTask} showTaskDetails={showTaskDetails} setSelectedTaskTitle={setSelectedTaskTitle} selectedTaskDue={selectedTaskDue} setSelectedTaskDue={setSelectedTaskDue} setSelectedListTitle={setSelectedListTitle} selectedList={selectedList} setSelectedList={setSelectedList} compNum={compNum} setCompNum={setCompNum} selectedTaskList={selectedTaskList} deleteTask={deleteTask} deletedTasks={deletedTasks} setDeletedTasks={setDeletedTasks}/>
        </div>
    )

}

export default UserHomepage
