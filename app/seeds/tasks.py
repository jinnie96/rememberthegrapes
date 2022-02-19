from app.models import db, Task
from datetime import date

def seed_tasks():
    task1 = Task(
        user_id= 1, list_id=1, title="Fold my clothes", due_by=date(2022, 8, 15), complete=False
    )

    task2 = Task(
        user_id= 2, list_id=2, title="Wash the car", due_by=date(2022, 9, 15), complete=False
    )

    task3 = Task(
        user_id= 3, list_id=3, title="Mow the lawn", due_by=date(2022, 10, 15), complete=False
    )

    task4 = Task(
        user_id= 4, list_id=4, title="Do the dishes", due_by=date(2022, 11, 15), complete=False
    )

    task5 = Task(
        user_id= 1, list_id=5, title="Do the laundry", due_by=date(2022, 1, 15), complete=False
    )

    task6 = Task(
        user_id= 2, list_id=6, title="Get a job", due_by=date(2022, 2, 15), complete=False
    )

    task7 = Task(
        user_id= 3, list_id=7, title="Wipe the windows", due_by=date(2022, 3, 15), complete=False
    )

    task8 = Task(
        user_id= 4, list_id=8, title="Pick up the kids", due_by=date(2022, 4, 15), complete=False
    )

    task9 = Task(
        user_id= 2, list_id=1, title="Do Homework", due_by=date(2023, 9, 15), complete=False
    )

    task10 = Task(
        user_id= 3, list_id=1, title="Study", due_by=date(2023, 10, 15), complete=False
    )

    task11 = Task(
        user_id= 4, list_id=4, title="Clean the table", due_by=date(2023, 11, 15), complete=False
    )

    task12 = Task(
        user_id= 1, list_id=5, title="Make dinner", due_by=date(2023, 1, 15), complete=False
    )

    task13 = Task(
        user_id= 2, list_id=6, title="Shower", due_by=date(2023, 2, 15), complete=False
    )

    task14 = Task(
        user_id= 3, list_id=7, title="Sleep", due_by=date(2023, 3, 15), complete=False
    )

    task15 = Task(
        user_id= 4, list_id=8, title="Exercise", due_by=date(2023, 4, 15), complete=False
    )


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)
    db.session.add(task5)
    db.session.add(task6)
    db.session.add(task6)
    db.session.add(task7)
    db.session.add(task8)
    db.session.add(task9)
    db.session.add(task10)
    db.session.add(task11)
    db.session.add(task12)
    db.session.add(task13)
    db.session.add(task14)
    db.session.add(task15)


    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
