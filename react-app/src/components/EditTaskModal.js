import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './EditTaskModal.css'

const EditTaskModal = ({ setShowModal, listsArr, selectedTaskId, toggleModal }) => {
    const [newTitle, setNewTitle] = useState("")
    const [newListId, setNewListId] = useState()
    const [newDueBy, setNewDueBy] = useState("0000-00-00T00:00")
    const [errors, setErrors] = useState("")
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTask = {
            title: newTitle,
            due_by: newDueBy
        }
        await dispatch(updateOneTask(selectedTaskId, newTask))
        toggleModal()
    }

    const newTitleFunc = async (e) => {
        setNewTitle(e.target.value)
    }

    const newDueByFunc = async (e) => {
        setNewDueBy(e.target.value)
    }

    const newListIdFunc = async (e) => {
        setNewListId(e.target.parentElement.childNodes[0].id)
    }
    // <input id="taskInput" name='title' required="true" type='text' placeholder="Add a task.." value={title} onChange={updateTitle}></input><br></br>
    // <input id="dateInput" type="datetime-local" onChange={updateDate} value={dueBy} required></input>
    // <label defaultValue="null" for="lists">List:</label>
    // <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
    //     <option value="None">None</option>


    return (

        <div className='edit-task-container'>
            <span className="close-modal" onClick={toggleModal}></span>
            <div>Edit Task</div>
            <form className='edit-task-form' onSubmit="return false">
                <ul className='errors'>
                    <li className="errors">
                        {errors}
                    </li>
                </ul>
                <input
                    className='edit-title-input'
                    name='title'
                    type="text"
                    required
                    onChange={newTitleFunc}
                    value={newTitle}
                />
                <input
                    name='dateDue'
                    type="datetime-local"
                    onChange={newDueByFunc}
                    value={newDueBy}
                />
                <select
                    name="lists"
                    onChange={newListIdFunc}
                    value={newListId}
                    >
                    {listsArr && (listsArr.map(list => (

                        <option value={list.id}>{list.title}</option>
                        )))}
                </select>
                <button id='new-task' type="submit" onClick={handleSubmit}>Update</button>
            </form>
        </div>
    )

}

// <select name="lists" id="listOptions" onChange={changeNewTaskListId}>
//                     <option value="None">None</option>
//                 {listsArr && (listsArr.map(list => (

//                     <option value={list.id}>{list.title}</option>
//                     )))}
//                 </select>

export default EditTaskModal
