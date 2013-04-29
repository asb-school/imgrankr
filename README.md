# imgrankr


## API

### GET api/post

Gets top 10 posts in all hashtag categories, sorted by likes with the highest count

### GET api/post/:id

Gets a specific post with given :id

### GET api/post?hashtag=:hashtag

Gets top 10 posts in given :hashtag category, sorted by likes with the highest count

### POST api/post

Creates a post with the following possible parameters

##### Parameters

- title (required)
- url (required)
- user (required)
- likes (default set to 0)
- hashtag (default set to #all) 


### GET api/hashtag

Returns a list of all hashtags

### GET api/hashtag/:id

Return a specific hashtag with given :id

### POST api/hashtag

Creates a hashtag

##### Parameters

- name (required, but not enforced)

### PUT api/hashtag/:id

Updates hashtag with given :id

##### Parameters

- name
