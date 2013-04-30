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
	$scope.greeting = 'age';
	
	// Get all posts
	$scope.posts = getAllPosts.query();
}

function secondController($scope)
{
	$scope.custom = 'I DUNNO MAN';
}