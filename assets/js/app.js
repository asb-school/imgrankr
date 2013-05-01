/*
 *
 *	imgrankr
 *	andrew breja
 *
 *	app.js
 *
*/


// Define angular application
var application = angular.module('imgrankr', ['ngResource']);

// Setup application route configuration
application.config(['$routeProvider', function($routeProvider) 
{
	$routeProvider.when('/', { templateUrl: 'template/main.html', controller: 'mainController' });
	$routeProvider.when('/:id', { templateUrl: 'template/second.html', controller: postController });
	$routeProvider.otherwise({ redirectTo: '/' });
}]);

// Setup resource factories
application.factory('Post', function($resource)
{
	return $resource('/api/post');
});

// Service for posts


// application.service('PostHandler', ['$rootScope', function($rootScope)
// {
// 	return 
// 	{
// 		posts: [],
// 		update: function(givenPosts)
// 		{
// 			this.posts = givenPosts;
// 		}
// 	};
// });

// application.service('PostHandler', [ '$rootScope', function($rootScope)
// {
// 	return
// 	{
// 		menu: [ 'item 1' ],
// 		add: function(item)
// 		{
// 			this.menu.push(item);
// 			$rootScope.$broadcast('PostHandler.update', this.menu);
// 		}
// 	};
// }]);


// application.controller('ControllerA', [ 'PostHandler', '$scope', function( PostHandler, $scope ) {
//    $scope.menu = PostHandler.menu;

//    $scope.addItem = function() {
//     PostHandler.add( $scope.newItem );  
//    };

//    $scope.$on( 'PostHandler.update', function( event, menu ) {
//      $scope.menu = menu;
//    });
//  }]);


application.service( 'PostHandler', [ '$rootScope', function( $rootScope ) {
   return {
      menu: [],
      add: function(givenPosts) {
        this.menu = givenPosts;
        $rootScope.$broadcast( 'PostHandler.update', this.menu );
      } 
   };
 }]);

application.controller( 'mainController', [ 'PostHandler', '$scope', 'Post', function( PostHandler, $scope, Post) {
   

   $scope.posts = Post.query();

   // var sumthin = Post.query(function () {
   // 	console.log('we got some stuff');
   // });

   $scope.getByHashtag = function(givenHashtag) 
   {
    PostHandler.add( $scope.newItem );  

    var postsFromApi = Post.query({ hashtag: givenHashtag }, function()
	{
		PostHandler.add(postsFromApi);
	});
   };

   $scope.$on( 'PostHandler.update', function( event, givenPosts ) {
     $scope.posts = givenPosts;
   });
 }]);

// function mainController($scope)
// {

// }

// mainController.$inject = ['$scope'];

// Main controller
// function mainController($scope, Post) 
// {
	
	
// 	// Get all posts
// 	var allPosts = Post.query(function ()
// 	{
// 		console.log('all posts');
// 		// console.dir(allPosts);
// 		// PostData = allPosts;
// 		 // = allPosts;

// 		// console.dir($scope);


// 		console.dir($scope.posts);

// 		// var postsArray = [];
// 		// var numberOfObjectsPerRow = 3;
// 		// var counter = 1;

// 		// // Check if we have posts
// 		// if (allPosts)
// 		// {
// 		// 	console.log('allposts length: ', allPosts.length);

// 		// 	rowObject = new Object();

// 		// 	for (var iterator = 0; iterator < allPosts.length; iterator++)
// 		// 	{
// 		// 		if (counter === 1)
// 		// 		{
// 		// 			rowObject.column1 = allPosts[iterator];
// 		// 			if (iterator === allPosts.length - 1)
// 		// 			{
// 		// 				postsArray.push(rowObject);
// 		// 			}

// 		// 			counter++;
// 		// 		}
// 		// 		else if (counter === 2)
// 		// 		{
// 		// 			rowObject.column2 = allPosts[iterator];
// 		// 			if (iterator === allPosts.length - 1)
// 		// 			{
// 		// 				postsArray.push(rowObject);
// 		// 			}

// 		// 			counter++;
// 		// 		}
// 		// 		else if (counter === 3)
// 		// 		{
// 		// 			rowObject.column3 = allPosts[iterator];
// 		// 			postsArray.push(rowObject);

// 		// 			rowObject = new Object();

// 		// 			counter = 1;
// 		// 		}
// 		// 	}

// 		// 	$scope.posts = postsArray;
// 		// }
// 	});

// 	// Get by hashtag
// 	$scope.getByHashtag = function(givenHashtag)
// 	{
		

// 		console.log('the hashtag is:', givenHashtag);
// 		var posts = Post.query({ hashtag: givenHashtag } , function()
// 		{
// 			console.log('got some results');
// 			console.dir(posts);
// 			$scope.posts = posts;

// 			console.dir($scope);
// 		});


// 	}
// }


// Create post
function createPost($scope, Post)
{
	$scope.create = function(post)
	{
		var newPost = new Post();
		newPost.title = post.title;
		newPost.url = post.url;
		newPost.hashtag = post.hashtag;

		newPost.$save();
	}
}


function postController($scope, $routeParams, Post)
{
	// Get a post for given parameter id
	var post = Post.query({ id: $routeParams.id }, function()
	{
		$scope.post = post[0]; // This will probably blow up at some point
	});
}