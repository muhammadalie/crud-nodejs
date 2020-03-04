const server_config = require('../config/servers');
var querystring = require('querystring');
var http = require('http');

let noteCreate = function(body) {
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(body);

		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/notes/create',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)
			}
		};

		var httpreq = http.request(options, function(response) {
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.write(data);
		httpreq.end();
	});
};

let noteGet = function(params) {
	console.log('=========PROFILE GET=======');
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(params);
		console.log('data', data);
		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/notes/get?' + data,
			method: 'GET'
		};

		var httpreq = http.request(options, function(response) {
			console.log('ins request==');
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.end();
	});
};

let noteList = function(params) {
	console.log('=========PROFILE GET=======');
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(params);
		console.log('data', data);
		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/notes/list?' + data,
			method: 'GET'
		};

		var httpreq = http.request(options, function(response) {
			console.log('ins request==');
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.end();
	});
};

let noteUpdate = function(params) {
	console.log('=========NOTE Update=======');
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(params);
		console.log('data', data);
		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/notes/update',
			method: 'PUT',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)
			}
		};

		var httpreq = http.request(options, function(response) {
			console.log('ins request==');
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.write(data);
		httpreq.end();
	});
};

let noteRemove = function(body) {
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(body);

		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/notes/remove',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)
			}
		};

		var httpreq = http.request(options, function(response) {
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.write(data);
		httpreq.end();
	});
};

let fileRemove = function(body) {
	return new Promise((resolve, reject) => {
		let data = querystring.stringify(body);

		let options = {
			host: server_config.STORE_HOST,
			port: server_config.STORE_PORT,
			path: '/file/delete',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': Buffer.byteLength(data)
			}
		};

		var httpreq = http.request(options, function(response) {
			response.setEncoding('utf8');
			let res_data = {};
			response.on('data', function(chunk) {
				console.log('body: ' + chunk);
				res_data = chunk;
			});
			response.on('end', function() {
				console.log('====success====>', res_data, `${response.statusCode}`);
				return resolve({ data: res_data, statusCode: response.statusCode });
			});
		});
		httpreq.on('error', e => {
			return reject(e);
		});
		httpreq.write(data);
		httpreq.end();
	});
};

module.exports = {
	noteCreate: noteCreate,
	noteGet: noteGet,
	noteRemove: noteRemove,
	noteList: noteList,
	noteUpdate: noteUpdate,
	fileRemove: fileRemove
};
