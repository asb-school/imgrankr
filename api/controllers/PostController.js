/*---------------------
	:: Post 
	-> controller
---------------------*/
var PostController = 
{
	// Display all posts
	defaultGet: function(request, response)
	{
		// Send results back to client
		var sendResults = function (error, posts)
		{
			// There was an error
			if (error) 
			{
				return response.json({ error: error }, 500);
			}

			// Successful
			else
			{
				if (posts)
				{
					var filteredPosts = [];

					for (var post in posts)
					{
						filteredPosts.push(posts[post].values);
					}

					return response.send(filteredPosts);
				}
				else
				{
					return response.json({ error: 'No posts found'}, 500);
				}
			}
		}


		// Search by hashtag
		if (request.param('hashtag'))
		{
			Post.findAll({ where: { hashtag: parseInt(request.param('hashtag')) } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
		}

		// Default -> #all hashtags
		else
		{
			// this is bad - need to get ANY hashtags, not just #all (1)
			Post.findAll({ where: { hashtag: 1 } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
		}
	},


	// Find post by id
	findById: function(request, response)
	{
		Post.find(request.param('id')).done(function (error, post)
		{
			if (error) 
			{
				return response.send(error, 500);
			}

			else
			{
				if (post)
				{
					return response.send(post.values);
				}
				else
				{
					return response.json({ error: 'No post found' }, 500);
				}
			}
		});
	},


	// Create post
	create: function(request, response)
	{
		// Create a post function
		var createPost = function (givenHashtag)
		{
			Post.create(
			{
				title: request.param('title'),
				url: request.param('url'),
				likes: request.param('likes') || 0,
				user: request.param('user'),
				hashtag: givenHashtag

			}).done(function (error, post)
			{
				// Error
				if (error) return response.json(error, 500);

				// Success
				else return response.json({ success: 'Post created successfully', postUrl: 'http://www.imgrankr.com/api/post/' + post.id }, 200);
			});
		}

		
		// Can't create a post if you didn't set the right parameters
		if (!request.param('title')) return response.json({ error: 'Title must be set' }, 500);
		if (!request.param('url')) return response.json({ error: 'URL must be set' }, 500);
		if (!request.param('user')) return response.json({ error: 'User must be set' }, 500);

		// Hashtag defined in request parameters?
		if (request.param('hashtag'))
		{
			// Check if it exists in hashtag collection
			Hashtag.findAll({ where: { name: request.param('hashtag') } }, { options: { limit: 1 } }).done(function (error, result)
			{
				if (error)
				{
					console.log(error);
				}
				else
				{
					// Hashtag already exists in hashtag collection
					if (result.length > 0)
					{
						// Check to make sure we have valid object
						if (result[0])
						{
							// Create post with existing hashtag id
							createPost(result[0].id);
						}
					}

					// Need to create a new hashtag
					else
					{
						Hashtag.create(
						{
							name: request.param('hashtag')

						}).done(function (error, hashtag)
						{
							if (error) 
							{
								console.log(error);
							}
							else
							{
								// Create post with newly created hashtag id
								createPost(hashtag.id);
							}
						})
					}
				}
			});
		}

		// No hashtag defined
		else
		{
			// Set default hashtag
			console.log('default hashtag #all with id 1 to be set');

			createPost(1);
		}
	}

};

module.exports = PostController;