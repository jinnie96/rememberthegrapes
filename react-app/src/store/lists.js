// ACTION TYPES

const GET_LISTS = 'tasks/GET_LISTS'
const GET_ONE_LIST = 'tasks/GET_ONE_LIST'
const ADD_LIST = 'tasks/ADD_LIST'
const UPDATE_LIST = 'tasks/UPDATE_LIST'
const DELETE_LIST = 'tasks/DELETE_LIST'
const GET_USER_LIST = 'tasks/GET_USER_LIST'

// ACTION CREATORS
const getLists = lists => ({
    type: GET_LISTS,
    payload: lists
})

const getOneList = list => ({
    type: GET_ONE_LIST,
    payload: list
})

const addList = list => ({
    type: ADD_LIST,
    payload: list
})

const updateList = list => ({
    type: UPDATE_LIST,
    payload: list
})

const deleteList = list => ({
    type: DELETE_LIST,
    payload: list
})

const getUserList = list => ({
    type: GET_USER_LIST,
    payload: list
})

// THUNK CREATORS

export const getAllLists = (id) => async dispatch => {
    console.log("IN DPSATCH------")
    const response = await fetch (`/api/lists/user/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getUserList(data));
        return data;
    }
}

export const getSingleLists = (id) => async dispatch => {
    const response = await fetch (`/api/lists/${id}`)
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        };

        dispatch(getOneList(data));
        return data;
    }
}

export const addOneList = (form) => async dispatch => {
    console.log("FORM@!#!@#!#", form)
    const response = await fetch (`/api/lists/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    if (response.ok) {
        const data = await response.json();
        console.log("DATAAAAAAAAA", data)
        dispatch(addList(data));
        return data;
    }
}

export const updateOneList = (id, task) => async dispatch => {
    const response = await fetch (`/api/lists/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
    console.log("UDPDATE RES", response)
    if (response.ok) {
        const data = await response.json();
        console.log(data, "UPADTE DATA")
        dispatch(updateList(data));
        return data;
    }
}

export const deleteOneList = (id) => async dispatch => {
    console.log("INSIDE API DELETE", id)
    const response = await fetch (`/api/lists/${id}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteList(id));
        return "Deleted";
    }
}

// INITIAL STATE

const initialState = {}

// REDUCER

export default function listReducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_LIST: {
            newState = {...state};
            // for (const key in action.payload) {
            //     newState[action.payload[key].id] = action.payload[key]
            // }
            console.log(action.payload.lists,"!!@#@!#@!#!#!#")
            action.payload.lists.forEach(list => {
                newState[list.id] = list
            })
            return newState
        }
        case GET_ONE_LIST: {
            newState = {
                ...state,
                [action.payload.task.id]: action.payload.task
            };
            return newState;
        };
        case ADD_LIST: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;
        };
        case UPDATE_LIST: {
            newState = {
                ...state,
                [action.payload.id]: action.payload
            };
            return newState;
        };
        case DELETE_LIST: {
            newState = { ...state };
            console.log("ACTION DELETE", action.payload)
            delete newState[action.payload];
            return newState;
        };

        default:
            return state;
    }
}
