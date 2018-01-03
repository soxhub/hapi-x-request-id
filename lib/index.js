"use strict";

const register = (server, options) => {
	const header = (options && options.header) || 'x-request-id';

	server.ext({
		type: 'onRequest',
		method: (request, h) => {
			request.id = request.headers[header] || request.id || request.info.id;
			return h.continue;
		}
	});
};

const pkg = require('../package.json');
const name = pkg['name'];
const version = pkg['version'];

exports.plugin = {
	register,
	name,
	version,
	pkg
};
