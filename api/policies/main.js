// Display requests to log

module.exports = function (req,res,ok) {
	
	console.log('The req is:');
	console.dir(req.url);
	
	return ok();	
};