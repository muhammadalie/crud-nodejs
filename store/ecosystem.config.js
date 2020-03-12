module.exports = {
	apps: [
		{
			name: 'store',
			script: './app.js',
			node_args: '--expose_gc',
			env: {
				NODE_ENV: 'staging'
			},
			env_staging: {
				NODE_ENV: 'staging'
			},
			env_dev: {
				NODE_ENV: 'dev'
			},
			env_production: {
				NODE_ENV: 'production'
			},
			env_local: {
				NODE_ENV: 'local'
			}
		}
	]
};
