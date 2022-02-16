from app.models import db, Task
from datetime import date

def seed_tasks():
    task1 = Task(
        user_id= 4, list_id=1, title="Fold my clothes", due_by=date(2022, 8, 15), complete=False
    )

    task2 = Task(
        user_id= 4, list_id=2, title="Wash the car", due_by=date(2022, 9, 15), complete=False
    )

    task3 = Task(
        user_id= 4, list_id=2, title="Mow the lawn", due_by=date(2022, 10, 15), complete=False
    )

    task4 = Task(
        user_id= 4, list_id=1, title="Do the dishes", due_by=date(2022, 11, 15), complete=False
    )


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
