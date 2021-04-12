const core = require('@actions/core');

const { getLinkChecker } = require('./utils/checker');
const { getOptions, getInputs, dumpInputs } = require('./utils/misc');
const { getHandlers } = require('./utils/handlers');
const { logSummary, logDetailed } = require('./utils/reporting');

const runChecker = async function(url, recursive, silent) {
	return new Promise((resolve, reject) => {
		try {
			getLinkChecker(recursive, getOptions(), getHandlers(resolve, silent)).enqueue(url);
		} catch(err) {
			reject(err);
		}
	});
}

module.exports.run = async function() {
	const inputs = getInputs();

	if(!inputs.silent) {
		dumpInputs(inputs);
	}

	core.startGroup('Running Link Checker');
	const results = await runChecker(inputs.url, inputs.recursive, inputs.silent);
	core.endGroup();

	if(!inputs.silent) logSummary(results);

	if(!inputs.silent && !inputs.quiet) logDetailed(results);

	const numBrokenLinks = results.filter(result => result.broken).length;

	if(numBrokenLinks > 0) {
		core.setFailed(numBrokenLinks + ' broken links');
	}
}
