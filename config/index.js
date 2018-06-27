const configValues = require('./config');

module.exports = {
	getDbConnectionString: function () {
		return `mongodb://localhost/${configValues.database}`;
	}
}