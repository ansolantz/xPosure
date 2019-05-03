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

### index.js (public)

 => xplore.co/

- home
- signup

### auth.js (public)
=> xplore.co/signup

- authentication flow (logn/signup)

### explore.js (protected?)
- render PhotoView

=> xplore.co/explore
=> xplore.co/media_id

### manage.js (protected)
=> xplore.co/user_id/mymedia
=> xplore.co/user_id/manage

- render MyMedia
- get all Media (+filter)

- render MediaEdit
- patch/put/delete media

- create folders


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