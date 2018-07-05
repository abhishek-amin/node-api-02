module.exports = (server) => {
	require('./users')(server);
	require('./posts')(server);
}