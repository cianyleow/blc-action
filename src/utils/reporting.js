const core = require('@actions/core');

function getStatus(results) {
	return getBroken(results) === 0 ? 'Passed' : 'Failed';
}

const getWorking = results => results.filter(result => result.working).length;
const getSkipped = results => results.filter(result => result.excluded).length;
const getBroken = results => results.filter(result => result.broken).length;

module.exports.logSummary = function(results) {
	core.startGroup('BLC Summary');
	core.info('Overall STATUS: ' + getStatus(results));
	core.info('------ Working: ' + getWorking(results));
	core.info('------ Skipped: ' + getSkipped(results));
	core.info('------- Broken: ' + getBroken(results));
	core.endGroup();
}

module.exports.logDetailed = function(results) {
	core.startGroup('BLC Detailed');
	core.info('TBD');
	core.endGroup();
}

