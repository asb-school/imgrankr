/*---------------------
	:: Post
	-> model
---------------------*/
module.exports = 
{
	attributes: 
	{
		title: 'STRING',
		url: 'STRING',
		likes: { type: 'INTEGER', defaultValue: 0 },
		user: 'INTEGER',
		hashtag: 'STRING'
	}
};