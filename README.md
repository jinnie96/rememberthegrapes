# Remember the Grapes

Remember the Grapes is a clone of the popular to-do website, [Remember the Milk](www.rememberthemilk.com).

Check out Remember the Grapes at the live site: [Remember the Grapes](https://remember-the-grapes.herokuapp.com/).


## Getting Started
To view and use this application, you can either navigate to the [live hosted site](https://remember-the-grapes.herokuapp.com/) and login as a new or demo user, or download the project locally:
1. Clone this repository ```git clone https://github.com/jinnie96/rememberthegrapes```

2. Open the file and install dependencies with ```pipenv install```

3. ```cd``` into ```/react-app``` and install dependencies ```npm install```

4.  Create a .env file based on the .env.example given

5.  Setup a PostgresSQL user + database:
    ```javascript
    psql -c "CREATE USER <username> PASSWORD '<password>' CREATEDB"
    psql -c "CREATE DATABASE <database name> WITH OWNER <username>"
    ```

6. Start shell + migrate database + seed database + run flask ```/python-project```
    ```javascript
    pipenv shell
    flask db upgrade
    flask db migrate
    flask db seed all
    flask run
    ```

6. Keeping flask running, start the app by running ```npm start``` in ```/react-app```

7. Enjoy!

## Libraries Used
Remember the Grapes is a full stack application that is built using a React/Redux frontend and a Flask/Python backend. PostgreSQL is utilized for data storage.
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height=40/>

## Features

### Splash Page
![image](https://user-images.githubusercontent.com/90893496/155971605-ed4d89c6-5231-47b6-98f1-22b8cf04f989.png)

### Login
![image](https://user-images.githubusercontent.com/90893496/155971723-9fed6c99-33fc-4dae-ad04-ac869a95e64e.png)

### Sign-Up
![image](https://user-images.githubusercontent.com/90893496/155971844-eb0fa0e7-188a-4dcf-9d0d-4f0b0380e681.png)

### Homepage
![image](![Screen Shot 2022-02-28 at 2 59 26 AM](https://user-images.githubusercontent.com/90893496/155973656-fde3c8c3-444e-41fa-82e3-2b4c6438e2f0.png))

## Functionality

### Lists (Create, Read, Update, Delete)
Users can implement full CRUD functionality on lists.

### Tasks (Create, Read, Update, Delete)
Users can implement full CRUD functionality on tasks. Tasks that belong to a list will be shown under that list.

### List Summary (Read, Update)
Users can view the details of their list. The list summary update as the user creates, updates, or deletes lists/tasks.

## Future Features
- Search
    - Users will be able to search for tasks and lists that they've created.
- Subtasks
    - Users will be able to add subtasks onto their tasks.
