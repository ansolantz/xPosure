# xPosure (working title)

## Description
xPosure is a social picture discovery and organisation application. It is build using express, Node.js, mongoose, and bootstrap.


## Backlog


## Data Models

### user.js
{
(_id)
first name
last name
email
username
password#
profile
    profile bio
    profile image
    location
media [...]
followers [...]
following [...]
likes [...]
saved [...]
timestamps
    joined
    activity log
}

### media.js
{
(_id)
url
    thumbnail
    full_size
meta
    media_type
    timestamp
    geolocation
    camera
    description
creatorId
visibility
likes
saves
filtertags [...]
}

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