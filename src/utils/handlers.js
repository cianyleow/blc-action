const core = require('@actions/core');

module.exports.getHandlers = function(resolve, silent) {
	const results = [];

	function onPage(err, pageUrl) {
		if(!silent) core.info('Working on page: ' + pageUrl);
	}

	function onLink(result) {
		results.push({
			url: result.url,
			broken: result.broken,
			excluded: result.excluded,
			working: !result.broken && !result.excluded,
			reason: result.broken ? result.brokenReason : (result.excluded ? result.excludedReason : null)
		});
	}

	function onEnd() {
		resolve(results);
	}

	return {
		page: onPage,
		link: onLink,
		junk: onLink,
		end: onEnd
	}
}
