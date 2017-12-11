"use strict";

exports.register = (server, options) => {
	const header = (options && options.header) || 'x-request-id';

	server.ext({
		type: 'onRequest',
		method: (request, h) => {
			request.id = request.headers[header] || request.id;
			return h.continue;
		}
	});
};

exports.name = require('../package.json')['name'];
exports.register.attributes = {
	pkg: require('../package.json')
};
