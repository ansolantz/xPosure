# xPosure 

## Description
xPosure was the second project execute at Ironhack. In is a social picture discovery and organisation application built in only 6 days. It is a fullstack application built using express, Node.js, mongoose, and bootstrap.

It supports social login using Instagram as well as image uploads to an external server. Further it also supports liking other user images and exploring content from others to get inspiration and follow them.

Features that was on the todo list but never finished due to time contraints were: 
- Google Login and photo sync
- Filtering by geo location
- Link counts
- etc


## Prepration work - User Stories

**HOME**

As a user, I want to see a nice landing page with info about the app and login , so that I can understand what it is about and how to join.


**SIGNUP**

As a user, I want to sign up easily, so that I can start managing and sharing my media.


**MY MEDIA**

As a user, I want to see all all my imported media in one site , so that I can have an overview and deciide what to do with it.

**MEDIA EDIT**

As user, I want to be able to change the data and settings of my media, so that I can optimise, organise, and share it. 

**PHOTO VIEW**

As a user, I want to have a full-scale picture view, so I can see all the details

**FEED**

As a user, I want have a feed of pictures from other users, so I can expore what aothers have shared.

**MAP EXPLORE**

As a user, I want to see a map with tagges pictures, so I can see what pictures were taken around me or around a location I'm interested in. 






## Data Models

### user.js
```js
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  username: String,
  passwordHash: String,
  profile: {
​    bio: String,
​    image: String,
​    location: String
  },
  media: [],
  followers: [],
  following: [],
  likes: [],
  saved: [],
  activityLog: [],
  timestamp: {
​    created_at: Date(),
  }
});
```

### media.js
```js
const mediaSchema = new Schema({
  url: {
​    thumbnail: String, 
​    full_size: String
  },
  meta: {
​    media_type: String,
​    timestamp: Date(),
​    geolocation: [Number],
​    camera: String,
​    description: String
  },
  creatorId: String,
  visibility: boolean,
  likes: [],
  saves: [],
  filtertags: []
});
```

## Routes


### index.js (public)

| Route | HTTP Verb | Description           |
| ----- | --------- | --------------------- |
| /     | GET       | render home screen w/ |
| /     | POST      | Log-in                |

### auth.js (public)

| Route   | HTTP Verb | Description        |
| ------- | --------- | :----------------- |
| /signup | GET       | render signup form |
| /signup | POST      | Create new user    |

### explore.js (protected?)
| Route           | HTTP Verb | Description                        |
| --------------- | --------- | ---------------------------------- |
| /explore        | GET       | render explore view, get all media |
| /explore/:filter | POST      | Send query for filtered feed       |
| /explore/:filter | GET       | Render filtered feed               |
| /explore/:media_id       | POST      | Send query for media_id            |
| /explore/:media_id       | GET      | Render image in view               |



### mymedia.js (protected)
| Route            | HTTP Verb | Description                        |
| ---------------- | --------- | ---------------------------------- |
| /mymedia         | GET       | render myMedia view, get all media |
| /mymedia/:filter  | POST      | Send query for filtered media      |
| /mymedia/:filter  | GET       | Render filtered media              |
| /mymedia/manage/:media_id | POST      | Send query for media_id            |
| /mymedia/manage/:media_id | GET      | Render image in view               |
| /mymedia/manage/:media_id | PATCH/PUT | Change media in DB                 |
| /mymedia/manage/:media_id | DELETE     | Delete media in DB                 |
|                  |           |                                    |




## Views

### Layout (+logout)

### Home + login (public)
### Signup (public)

### MyMedia (+ 3rd-party-collections)
### MediaEdit

### PhotoView

### ExploreView/Feed

### MapExplore


## Links


### Trello
[Trello kanban board] (https://trello.com/invite/b/gNbmMcI2/6bc5b7c2b98e50db7c421eee55367784/xposure)

### Git
[Github code repository] (https://github.com/BenjaminWoerner/xPosure)


### Slides
N/A
