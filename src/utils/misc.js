const core = require('@actions/core');

function getBoolean(name) {
	const val = core.getInput(name);
	if(val != null) return val.toLowerCase() === 'true';
	return false;
}

module.exports.getOptions = function() {
	return {};
}

module.exports.getInputs = function() {
	return {
                url: core.getInput('url', { require: true }),
                recursive: getBoolean('recursive'),
                quiet: getBoolean('quiet'),
                silent: getBoolean('silent')
        }
}

module.exports.dumpInputs = function(inputs) {
	core.startGroup('Dump Inputs');
	core.info(`[INFO] url: ${inputs.url}`);
	core.info(`[INFO] recursive: ${inputs.recursive}`);
	core.info(`[INFO] quiet: ${inputs.quiet}`);
	core.info(`[INFO] silent: ${inputs.silent}`);
	core.endGroup();
}
