const { SiteChecker, HtmlUrlChecker } = require('broken-link-checker');

module.exports.getLinkChecker = function(recursive, checkerOptions, eventHandlers) {
	if(recursive) {
		return new SiteChecker(checkerOptions, eventHandlers);
	} else {
		return new HtmlUrlChecker(checkerOptions, eventHandlers);
	}
}
