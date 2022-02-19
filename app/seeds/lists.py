from app.models import db, List

def seed_lists():
    list1 = List(
        user_id= 1, title="Home"
    )

    list2 = List(
        user_id= 2, title="Work"
    )

    list3 = List(
        user_id= 3, title="School"
    )

    list4 = List(
        user_id= 4, title="Club"
    )

    list5 = List(
        user_id= 1, title="Weekend"
    )

    list6 = List(
        user_id= 1, title="Housework"
    )

    list7 = List(
        user_id= 2, title="Supplies"
    )

    list8 = List(
        user_id= 1, title="Groceries"
    )

    list9 = List(
        user_id= 3, title="Clothes"
    )


    db.session.add(list1)
    db.session.add(list2)
    db.session.add(list3)
    db.session.add(list4)
    db.session.add(list5)
    db.session.add(list6)
    db.session.add(list7)
    db.session.add(list8)
    db.session.add(list9)

    db.session.commit()

def undo_lists():
    db.session.execute('TRUNCATE tasks RESTART IDENTITY CASCADE;')
    db.session.commit()
