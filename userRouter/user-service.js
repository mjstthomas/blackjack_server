const userService = {
    getAllUsers(knex){
        return knex
        .select('*')
        .from('users')
        .join('user_purse', 'users.id', '=', 'user_purse.id')
    },
    getUser(knex, email, password){
        return knex
            .from('users')
            .join('user_purse', 'users.id', '=', 'user_purse.id')
            .where({
                user_email: email,
                password: password
            })
            .first()
    },
    insertUser(db, newUser) {
        const {user_name, user_email, password, id} = newUser;
        const insertedUser = {user_email,user_name, password, id}
        return db
        .insert(insertedUser)
        .into('users')
        .returning('*')
        .then(([user]) => user)
        .then(user =>{
            userService.getUser(db, `${user.user_email}`, `${user.password}`)
        })
        // .then(()=>{
        //     db
        //     .insert(insertedUser.id)
        //     .into('user_purse')
        // })
        // .then(()=>{
        //     this.getAllUsers(db)
        // })
    },

    patchUser(knex, id){
        return knex
            .from('user_purse')
            .where({id})

    }
}

module.exports = userService