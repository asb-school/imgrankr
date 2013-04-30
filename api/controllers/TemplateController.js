/*---------------------
	:: Template 
	-> controller
---------------------*/
var TemplateController = {

	getTemplate: function(request, response)
	{
		// Setup
		var fs = require('fs');
		var filename = request.param('id');
		var filepath = '/var/engine/imgrankr/assets/templates/' + filename;

		// Response header
		response.writeHead(200,
		{
			'Content-Type': 'text/html',
			'Transfer-Encoding': 'chunked'
		});

		// Check if file exists
		fs.exists(filepath, function(exists)
		{
			// If it does exist, send stream
			if (exists)
			{
				// Open up the file as a readable stream
				var readStream = fs.createReadStream(filepath);

				// When we have a valid stream
				readStream.on('open', function()
				{
					readStream.pipe(response);
				});

				// When read stream is done
				readStream.on('close', function()
				{
					response.end();
				});

				// Error with the read stream
				readStream.on('error', function(error)
				{
					response.end(error);
				});
			}

			// File does not exist, send error
			else
			{
				response.end('Template file not found');
			}
		});
	}

};
module.exports = TemplateController;