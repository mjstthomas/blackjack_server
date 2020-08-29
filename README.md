# Battle Blackjack API Server

## Technologies

1. Node.js
2. Knex
3. Express
4. Postgres
5. SQL

## Explanations of Routes
Using Node and Express I created an API using the express.route() method that allowed for the client to interact with my Postgresql database.
My users route would take the given information from the get request, check it against the postgres users table, it would find the user, join it with the user_purse that shared the same ID, and send it back.  
If it didn't find the user, it would create one and send it.
My user route was used to  patch wins, total_games, and the string assigned to the users character.
It would also allow the user to delete itself.
My leaderBoard route would get all the users and send it back to sort on the client side.
