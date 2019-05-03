# xPosure (working title)

## Description
xPosure is a social picture discovery and organisation application. It is build using express, Node.js, mongoose, and bootstrap.


## Backlog


## Data Models

### user.js
``const userSchema = new Schema({`

  `firstName: String,`

  `lastName: String,`

  `email: String,`

  `username: String,`

  `passwordHash: String,`

  `profile : {`

​    `bio: String,`

​    `image: String,`

​    `location: String`

  `},`

  `media: [],`

  `followers: [],`

  `following: [],`

  `likes: [],`

  `saved: [],`

  `activityLog: [],`

  `timestamp: {`

​    `created_at: "created_at",`

  `}`

`});`

### media.js
``const mediaSchema = new Schema({`

  `url: {`

​    `thumbnail: String,` 

​    `full_size: String`

  `},`

  `meta: {`

​    `media_type: String,`

​    `timestamp: true,`

​    `geolocation: [Number],`

​    `camera: String,`

​    `description: String`

  `},`

  `creatorId: String,`

  `visibility: true,`

  `likes: [],`

  `saves: [],`

  `filtertags: []`

`});`

## Routes





| Route             | HTTP Verb | Description                 |
| ----------------- | --------- | --------------------------- |
| /                 | GET       | render home screen w/       |
| /                 | POST      | Log-in                      |
| `/characters/:id` | PUT/PATCH | Update a specific character |
| `/characters/:id` | DELETE    | Delete a specific character |





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
| /explore/filter | POST      | Send query for filtered feed       |
| /explore/filter | GET       | Render filtered feed               |
| /media_id       | POST      | Send query for media_id            |
| /media_id       | POST      | Render image in view               |



### manage.js (protected)
| Route            | HTTP Verb | Description                        |
| ---------------- | --------- | ---------------------------------- |
| /mymedia         | GET       | render myMedia view, get all media |
| /mymedia/filter  | POST      | Send query for filtered media      |
| /mymedia/filter  | GET       | Render filtered media              |
| /manage/media_id | POST      | Send query for media_id            |
| /manage/media_id | POST      | Render image in view               |
| /manage/media_id | PATCH/PUT | Change media in DB                 |
| /manage/media_id | DELTE     | Delete media in DB                 |
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
https://trello.com/invite/b/gNbmMcI2/6bc5b7c2b98e50db7c421eee55367784/xposure

### Git
https://github.com/scottmallinson/xPosure


### Slides
N/A