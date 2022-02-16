from app.models import db, List

def seed_lists():
    list1 = List(
        user_id= 4, title="Home"
    )

    list2 = List(
        user_id= 4, title="Work"
    )


    db.session.add(list1)
    db.session.add(list2)
    db.session.commit()

def undo_lists():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
