# Project_2
I am creating a fantasy football drafting app. 

API: FantasyData API
https://api.sportsdata.io/api/nfl/fantasy/json/FantasyPlayers

NPM PACKAGES:
    "bcryptjs": "^2.4.3",
    "connect": "^3.7.0",
    "connect-mongo": "^4.6.0",
    "dotenv": "^16.0.1",
    "espn-fantasy-football-api": "^0.16.1",
    "express": "^4.18.1",
    "express-session": "^1.17.3",
    "liquid-express-views": "^1.0.8",
    "lodash": "^4.17.21",
    "method-override": "^3.0.0",
    "mongo": "^0.1.0",
    "mongoose": "^6.4.4",
    "morgan": "^1.10.0"

User Stories
As a user, I want to.....
 - draft NFL players to create a fantasy football team.
    - new schema
    - create a model for use
    - add drafted player to My Team
    - have a starting line up of QB, RB, RB, WR, WR, WR, Flex, DST, K.
    - have five bench spots.
    - Have a team name

 - view avialable NFL players in draft pool by ranking
    - query all players avaiable - find()?
    - return all players

- view a single player
    - query for a single fruit - by id? Search bar and click on name.
    - return single correct fruit
    - show player facts, stats, picture, schedule
    - leave a player comment/note
    - edit/delete a player comment/note

- update a single player
    - query for a single player - by id?
    - update that single player
    - return updated player

- delete a single player
    - query for a single player - by id?
    - delete or remove that player from your team
    - return a success of some kind

STRETCH GOALS
- Be able to add player to a Watch List/Draft Queue
- Sign in to see your team/s
- Have overall players rankings
- Be able to sort players by positions
- Have a flex position
- Have positon limits for each position
- Draft against computer players
- Have a dollar value for each player auction style
- Have a draft clock


Schema (model)
- Players
 - name: string
 - positon: string
 - team: string
 - age: number

- Comments
 - note: string
 - author: 
        - type: mongoose.Schema.Types.ObjectId,// this will be a single User
        - ref: 'User'// this is the string value from the model creation