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
			Post.findAll({ where: { hashtag: request.param('hashtag') } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
		}

		// Default -> #all hashtags
		else
		{
			Post.findAll({ where: { hashtag: 'all' } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
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
					return response.json({ error: 'No valid post' }, 500);
				}
			}
		});
	},


	// Create post
	create: function(request, response)
	{
		// Can't create a post if you didn't set the right parameters
		if (!request.param('title')) return response.json({ error: 'Title must be set' }, 500);
		if (!request.param('url')) return response.json({ error: 'URL must be set' }, 500);
		if (!request.param('user')) return response.json({ error: 'User must be set' }, 500);

		// Set hashtag
		var hashtag = request.param('hashtag') || 'all';

		// Check valid hashtag
		// if (var hashtag = request)

		Post.create(
		{
			title: request.param('title'),
			url: request.param('url'),
			likes: request.param('likes') || 0,
			user: request.param('user'),
			hashtag: request.param('hashtag') || 'all'

		}).done(function (error)
		{
			// Error
			if (error) return response.json(error, 500);

			// Success
			else return response.json({ success: 'Post created successfully' }, 200);
		})
	}

};

module.exports = PostController;