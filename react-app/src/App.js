import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import UserHomepage from './components/UserHomepage';
import SplashPage from './components/SplashPage'

function App() {
  const [loaded, setLoaded] = useState(false);
  const [selectedList, setSelectedList] = useState("All Tasks")
  const [selectedTask, setSelectedTask] = useState("")
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user)
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch, selectedList, selectedTask]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {user && (
        <NavBar/>
      )}
      <Switch>
        {!user && (
        <Route path='/' exact={true}>
          <SplashPage />
        </Route>

        )}
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          {/* <h1>My Home Page</h1> */}
          <UserHomepage />
        </ProtectedRoute>
        <ProtectedRoute path='/app/:listId'>
          {/* <DisplayListTasks /> */}
        </ProtectedRoute>
        <ProtectedRoute path='/app/$:listId/:id>'>
          {/* <DisplayTaskDetails /> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
