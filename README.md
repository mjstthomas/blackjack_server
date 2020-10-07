This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Battle Blackjack!

### link to site:

https://vercel.com/mjstthomas/react-blackjack/ashek0hms

![image](https://user-images.githubusercontent.com/53156193/90138764-586c1800-dd2c-11ea-8556-bb8981cfd9da.png)
![image](https://user-images.githubusercontent.com/53156193/90139307-0972b280-dd2d-11ea-88a6-15f04fd95250.png)
![image](https://user-images.githubusercontent.com/53156193/90138904-7c2f5e00-dd2c-11ea-97b4-3fda751c1a55.png)
![image](https://user-images.githubusercontent.com/53156193/90138989-98cb9600-dd2c-11ea-89b7-f8588f107dba.png)
![image](https://user-images.githubusercontent.com/53156193/90139067-b7ca2800-dd2c-11ea-93f8-569833f513c9.png)
![image](https://user-images.githubusercontent.com/53156193/90139130-c9abcb00-dd2c-11ea-8fa7-fb61855df15b.png)
![image](https://user-images.githubusercontent.com/53156193/90139176-db8d6e00-dd2c-11ea-9bad-b7597c829929.png)

### Summary:

" Created a fun and entertaining way to teach basic blackjack strategy."

" It starts off with taking you to the sign in screen using firebase Oauth."

" If you choose demo, it will take you thru a quick tutorial and let you play a game with no sign in."

" If you win or lose, it takes you to a window announcing it and sending you either back to the game screen or sign up screen depending on whether or not you are in demo mode."

" If you select the player image, it takes you to your player profile where you can change characters or delete your profile."

" There is a leader board telling players where they rank."

### Technologies

- React.js

- HTML

- CSS

- Javascript

- Node.js

- Express

- Knex

- Postgresql

- Google Firebase OAuth

### Explanations of Routes

Using Node and Express I created an API using the express.route() method that allowed for the client to interact with my Postgresql database.

#### Route /api/users/:user

My users route would take the given information from the get request, check it against the postgres users table, it would find the user, join it with the user_purse that shared the same ID, and send it back.  
If it didn't find the user, it would create one and then send the user info.

#### Route /api/user

My user route was used to patch wins, total_games, and the string assigned to the users character.
It would also allow the user to delete itself.

#### Route /api/leaderboard

My leaderBoard route would get all the users and send it back to sort on the client side.

### Route /api/strategy

Though never used in actual production app, was originally used to pull specific hit/stay info using users hand value in the get request. In the end, heroku server didn't have the speed required for the game to remain seemless and since the board was static, it was easier to create it as a file in the app and pull directily from that file.
