const tableService = {
    pullTable(knex){
        return knex
            .select('*')
            .from('blackjack_strategy')
    },
    pullTableById(knex, id){
        return knex
            .select('*')
            .from('blackjack_strategy')
            .where({id})
    }
}

module.exports = tableService