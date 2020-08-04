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
    insertUser(knex, newUser) {
        return knex.transaction(async tx => {
                const user =await tx.insert(newUser).into('users').returning('*')
                const user_purse = await tx.insert({id: newUser.id}).into('user_purse').returning('*')
                return {
                    ...user,
                    ...user_purse
                }
        })
    
    },

    updateUser(db, user){
        const {wins, total_games, correct } = user;
        const purse = {wins, total_games, correct };
        return db('user_purse')
            .where({id: user.id})
            .update(purse)
            .returning('*')
    },

    deleteUser(db, id){
        return db('users')
            .where({id: id})
            .delete()
            .returning('*')
    }
}

module.exports = userService