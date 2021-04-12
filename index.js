const core = require('@actions/core');
const main = require('./src/main');

try {
	main.run();
} catch(err) {
	core.setFailed(err.message);
}
