/*
 *
 *	imgrankr
 *	andrew breja
 *
 *	app.js
 *
*/


// Define angular application
var application = angular.module('imgrankr', ['ngResource'])

// Setup application route configuration
application.config(['$routeProvider', function($routeProvider) 
{
	$routeProvider.when('/', { templateUrl: 'template/main.html', controller: mainController });
	$routeProvider.when('/second', { templateUrl: 'template/second.html', controller: secondController });
	$routeProvider.otherwise({ redirectTo: '/' });
}]);

// Setup resource factories
application.factory('getAllPosts', function($resource)
{
	return $resource('/api/post');
});


// Main controller
function mainController($scope, getAllPosts) 
{
	// Get all posts
	var allPosts = getAllPosts.query(function ()
	{
		$scope.posts = allPosts;

		// var postsArray = [];
		// var numberOfObjectsPerRow = 3;
		// var counter = 1;

		// // Check if we have posts
		// if (allPosts)
		// {
		// 	console.log('allposts length: ', allPosts.length);

		// 	rowObject = new Object();

		// 	for (var iterator = 0; iterator < allPosts.length; iterator++)
		// 	{
		// 		if (counter === 1)
		// 		{
		// 			rowObject.column1 = allPosts[iterator];
		// 			if (iterator === allPosts.length - 1)
		// 			{
		// 				postsArray.push(rowObject);
		// 			}

		// 			counter++;
		// 		}
		// 		else if (counter === 2)
		// 		{
		// 			rowObject.column2 = allPosts[iterator];
		// 			if (iterator === allPosts.length - 1)
		// 			{
		// 				postsArray.push(rowObject);
		// 			}

		// 			counter++;
		// 		}
		// 		else if (counter === 3)
		// 		{
		// 			rowObject.column3 = allPosts[iterator];
		// 			postsArray.push(rowObject);

		// 			rowObject = new Object();

		// 			counter = 1;
		// 		}
		// 	}

		// 	$scope.posts = postsArray;
		// }
	});
}


// // Eval directive
// application.directive('ngIf', function ()
// {
// 	return 
// 	{
// 		link: function (scope, element, attributes)
// 		{
// 			if ()
// 		}
// 	}
// });

function secondController($scope)
{
	$scope.custom = 'I DUNNO MAN';
}