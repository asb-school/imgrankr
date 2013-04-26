/*---------------------
	:: Invalid 
	-> controller
---------------------*/
var InvalidController = {

	default: function(request, response)
	{
		response.send('Invalid route', 404);
	}

};
module.exports = InvalidController;