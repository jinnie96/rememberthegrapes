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
    const response = await fetch (`/api/tasks/user/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getUserTask(data));
        return data;
    }
}

export const searchInput = (id, term) => async dispatch => {
    const response = await fetch (`/api/tasks/search/${id}/${term}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return
        };
        dispatch(getUserTask(data))
        return data
        // dispatch()
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    if (response.ok) {
        const data = await response.json();
        dispatch(addTask(data));
        return null;
    } else {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const updateOneTask = (id, task) => async dispatch => {
    const response = await fetch (`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
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

export default function taskReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_TASK: {
            newState = {};
            // for (const key in action.payload) {
            //     newState[action.payload[key].id] = action.payload[key]
            // }
            action.payload.tasks.forEach(task => {
                newState[task.id] = task
            })
            return newState
        }

        case GET_ONE_TASK: {
            newState = {
                ...state,
                [action.payload.task.id]: action.payload.task
            };
            return newState;
        };
        case ADD_TASK: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;
        };
        case UPDATE_TASK: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;
        };
        case DELETE_TASK: {
            newState = { ...state };
            delete newState[action.payload];
            return newState;
        };

        default:
            return state;
    }
}
