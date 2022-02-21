import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOneTask, deleteOneTask, getAllTasks, updateOneTask } from '../store/tasks';
import './TasksListDisplay.css'

function TasksListDisplay ( {showTask, selectedListTitle, num, selectedTaskTitle, editingTaskTitle, selectedTaskDue, editingTask}) {
    return (
                    <div className="tasksListsDisplay">

            {showTask && (
                <div className="taskInfoContainer">
                    <p>{selectedListTitle}</p><br></br>
                    <h3>{num} tasks</h3><h3>completed</h3>
                </div>
            )}
            {!showTask && (
                <div class="taskSelectedInfoContainer">
                    {console.log("FALSE", selectedTaskTitle)}
                    <p onClick = {editingTaskTitle} id="taskTitleName">{selectedTaskTitle}</p><br></br>
                    <p>{selectedTaskTitle}</p>
                    {/* <input name='title' type='text' defaultValue={selectedTaskTitle} onChange={updateTaskTitle}></input> */}
                    <p id="taskdue">due: {selectedTaskDue}</p>
                    <p id="listName">list: {selectedListTitle}</p>
                    <button onClick = {editingTask} id="editTaskBtn">Edit Task</button>
                </div>
            )}
            </div>

    )
}

export default TasksListDisplay
