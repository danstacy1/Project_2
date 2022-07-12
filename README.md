# Project_2
I am creating a fantasy football drafting app. 

User Stories
As a user, I want to.....
 - draft NFL players to create a fantasy football team.
    - new schema
    - create a model for use
    - add drafted player to My Team
    - have a starting line up of QB, RB, RB, WR, WR, WR, Flex, DST, K.
    - have five bench spots.

 - view avialable NFL players in draft pool by ranking
    - query all players avaiable - find()?
    - return all players

- view a single player
    - query for a single fruit - by id? Search bar and click on name.
    - return single correct fruit
    - show player facts, stats, picture, schedule
    - leave a comment

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


Schema (model)
- Players
 - name: string
 - team: string
 - age: string
 - readyToEat: boolean