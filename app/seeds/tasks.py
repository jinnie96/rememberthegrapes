from app.models import db, Task

def seed_tasks():
    task1 = Task(
        user_id= 4, list_id=1, title="Fold my clothes", due_by="", complete=true
    )

    task2 = Task(
        user_id= 4, list_id=2, title="Wash the car", due_by="", complete=true
    )

    task3 = Task(
        user_id= 4, list_id=2, title="Mow the lawn", due_by="", complete=true
    )

    task4 = Task(
        user_id= 4, list_id=1, title="Do the dishes", due_by="", complete=true
    )


    db.session.add(task1)
    db.session.add(task2)
    db.session.add(task3)
    db.session.add(task4)

    db.session.commit()

def undo_tasks():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
