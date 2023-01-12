# Chai
> Created by Jason Liu<br>
> Version 1.0 of this app has been completed, but not yet deployed

### What is Chai?
Chai is a soft-toy tracking application used to track the lives and stories of different soft toys <br>
Each soft toy has various parts of their lives explored in this app such as:
- Basic information (such as their name, address, occupations, hobbies, etc)
- Travel plans (shown on a map)
- A list of commandments to follow
- A new schedule generated each morning with their to-do list for the day

CRUD functionality has also been created for each soft toy (affectionately titled **Cwimpies**)

### What technologies does this app use?
This application makes use of the MEAN stack. In more detail, that means:
- _**MongoDB**_ was used for the database <br>
- _**Express/NodeJS**_ was used for the backend<br>
- _**Angular**_ was used to create the frontend <br>
- _**Docker**_ was also used to run both services simultaneously 

Some additional services were also used to create certain features:
- **_Mapbox_** was used to create the map showcasing each soft toys travel plans
- **_Redis_** was used to implement caching and improve performance

### Future plans for the app
The app is currently completed as a standard web application, however it has not yet been deployed. <br>
Once the application is deployed, I also have the following ideas
- Making the application a PWA, so that it can support offline and mobile-native access
- Allowing the user to change the colour scheme of the application as they see fit (e.g. a light and dark mode to begin with)