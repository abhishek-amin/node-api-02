module.exports = (server) => {
	console.log('inside module index');
	require('./users')(server);
	require('./posts')(server);
}