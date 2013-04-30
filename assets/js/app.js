// Load angular module for app


// Route configuration
angular.module('imgrankr', ['ngResource'])
	.config(['$routeProvider', function($routeProvider) 
	{
		$routeProvider
			.when('/', { templateUrl: 'template/main.html', controller: mainController })
			.when('/second', { templateUrl: 'template/second.html', controller: secondController })
			.otherwise({ redirectTo: '/' });
	}]);


function mainController($scope) 
{
	$scope.greeting = 'age';
}

function secondController($scope)
{
	$scope.custom = 'I DUNNO MAN';
}