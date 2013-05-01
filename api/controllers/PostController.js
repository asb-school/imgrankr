/*---------------------
	:: Post 
	-> controller
---------------------*/
var PostController = 
{
	
	// Display all posts
	defaultGet: function(request, response)
	{
		// var async = require('async');
		
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
						// Add posts to list
						filteredPosts.push(posts[post].values)

						// Get hashtag value
						// Hashtag.find(posts[post].values.hashtag).done(function (error, result)
						// {
						// 	if (error) 
						// 	{ 
						// 		console.log(error);
						// 	}
						// 	else
						// 	{
						// 		// Update hashtag value
						// 		console.log(result.name);
						// 		posts[post].values.hashtag = result.name;
						// 		console.log(posts[post].values.hashtag);

						// 		// Add posts to list
						// 		filteredPosts.push(posts[post].values);
						// 	}
						// });
					}
		
					// Send filtered posts
					return response.send(filteredPosts);
				}
				else
				{
					return response.json({ error: 'No posts found' }, 500);
				}
			}
		}


		// Search by hashtag
		if (request.param('hashtag'))
		{
			Post.findAll({ where: { hashtag: request.param('hashtag') } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
			console.log('search by hashtag');
		}

		else if (request.param('id'))
		{
			console.log('need to search by id');
			Post.find(parseInt(request.param('id'))).done(function (error, post)
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
		}

		// Default -> all hashtags
		else
		{
			Post.findAll({ where: { hashtag: { '$exists': true } } }, { options: { limit: 10, sort: { likes: -1 } } }).done(sendResults);
		}
	},


	// Find post by id
	findById: function(request, response)
	{
		Post.find(parseInt(request.param('id'))).done(function (error, post)
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
				likes: parseInt(request.param('likes')) || 0,
				user: request.param('user') || 1,
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
		// if (!request.param('user')) return response.json({ error: 'User must be set' }, 500);

		// Hashtag defined in request parameters?
		if (request.param('hashtag'))
		{
			// Check if it exists in hashtag collection
			// Hashtag.findAll({ where: { name: request.param('hashtag') } }, { options: { limit: 1 } }).done(function (error, result)
			// {
			// 	if (error)
			// 	{
			// 		console.log(error);
			// 	}
			// 	else
			// 	{
			// 		// Hashtag already exists in hashtag collection
			// 		if (result.length > 0)
			// 		{
			// 			// Check to make sure we have valid object
			// 			if (result[0])
			// 			{
			// 				// Create post with existing hashtag id
			// 				createPost(result[0].id);
			// 			}
			// 		}

			// 		// Need to create a new hashtag
			// 		else
			// 		{
			// 			Hashtag.create(
			// 			{
			// 				name: request.param('hashtag')

			// 			}).done(function (error, hashtag)
			// 			{
			// 				if (error) 
			// 				{
			// 					console.log(error);
			// 				}
			// 				else
			// 				{
			// 					// Create post with newly created hashtag id
			// 					createPost(hashtag.id);
			// 				}
			// 			})
			// 		}
			// 	}
			// });

			// Create post with given hashtag value
			createPost(request.param('hashtag'));
		}

		// No hashtag defined
		else
		{
			// Create post with default hashtag -> #all (id: 1)
			createPost('all');
		}
	}

};

module.exports = PostController;