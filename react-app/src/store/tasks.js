// ACTION TYPES

const GET_TASKS = 'tasks/GET_TASKS'
const GET_ONE_TASK = 'tasks/GET_ONE_TASK'
const ADD_TASK = 'tasks/ADD_TASK'
const UPDATE_TASK = 'tasks/UPDATE_TASK'
const DELETE_TASK = 'tasks/DELETE_TASK'
const GET_USER_TASK = 'tasks/GET_USER_TASK'

// ACTION CREATORS
// const getTasks = tasks => ({
//     type: GET_TASKS,
//     payload: tasks
// })

const getOneTask = task => ({
    type: GET_ONE_TASK,
    payload: task
})

const addTask = task => ({
    type: ADD_TASK,
    payload: task
})

const updateTask = task => ({
    type: UPDATE_TASK,
    payload: task
})

const deleteTask = task => ({
    type: DELETE_TASK,
    payload: task
})

const getUserTask = task => ({
    type: GET_USER_TASK,
    payload: task
})

// THUNK CREATORS

export const getAllTasks = (id) => async dispatch => {
    const response = await fetch (`/api/tasks/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getUserTask(data));
        return data;
    }
}

export const getSingleTask = (id) => async dispatch => {
    const response = await fetch (`/api/tasks/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getOneTask(data));
        return data;
    }
}

export const addOneTask = (form) => async dispatch => {
    const response = await fetch (`/api/tasks/`, {
        method: 'POST',
        body: form
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addTask(data));
        return data;
    }
}

export const updateOneTask = (id) => async dispatch => {
    const response = await fetch (`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(updateTask(data));
        return data;
    }
}

export const deleteOneTask = (id) => async dispatch => {
    const response = await fetch (`/api/tasks/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteTask(id));
        return "Deleted";
    }
}

// INITIAL STATE

const initialState = {}

// REDUCER

export default function listReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_TASK: {
            newState = { ...state };
            for (const key in action.payload) {
                newState[action.payload[key].id] = action.payload[key]
            }
            return newState
        }
        case GET_ONE_TASK: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case ADD_TASK: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case UPDATE_TASK: {
            newState = {
                ...state,
                [action.payload.post.id]: action.payload.post
            };
            return newState;
        };
        case DELETE_TASK: {
            newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        };

        default:
            return state;
    }
}