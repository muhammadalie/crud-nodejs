var express = require('express');
var router = express.Router();
const { createProxyMiddleware } = require('http-proxy-middleware');

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		req.body.userId = req.user.username;
		req.query.userId = req.user.username;
		next();
	} else {
		return res.status(400).send({ result: 'Unauthorized' });
	}
}

const store = require('../controller/store');

router.post(
	'/upload/',
	checkAuthentication,
	createProxyMiddleware({
		target: 'http://localhost:8124',
		changeOrigin: true,
		onProxyReq(proxyReq, req, res) {
			if (req.method == 'POST' && req.body) {
				console.log('++++++++>>>>', req.user);
				proxyReq.setHeader('username', req.user.username);
			}
		}
	})
);

router.get(
	'/download/',
	checkAuthentication,
	createProxyMiddleware({
		target: 'http://localhost:8124',
		changeOrigin: true,
		onProxyReq(proxyReq, req, res) {
			if (req.method == 'GET' && req.user) {
				console.log('++++++++>>>>', req.user);
				proxyReq.setHeader('username', req.user.username);
			}
		}
	})
);

router.get(
	'/list/',
	checkAuthentication,
	createProxyMiddleware({
		target: 'http://localhost:8124',
		changeOrigin: true,
		onProxyReq(proxyReq, req, res) {
			if (req.method == 'GET' && req.user) {
				console.log('++++++++>>>>', req.user);
				proxyReq.setHeader('username', req.user.username);
			}
		}
	})
);

router.post('/delete/', checkAuthentication, store.removeFile);

module.exports = router;
