const cluster = require('cluster');
const utils = {};

utils.leftPad = function(number) {
	return ('0' + number).slice(-2);
}

utils.formatDate = function(date) {
	let h = utils.leftPad(date.getHours());
	let m = utils.leftPad(date.getMinutes());
	let s = utils.leftPad(date.getSeconds());

	let d = utils.leftPad(date.getDate());
	let M = utils.leftPad(date.getMonth() + 1);
	let y = date.getFullYear();
	return `${y}/${M}/${d} | ${h}:${m}:${s}`;
};

utils.cluster = function(args) {
	if(cluster.isMaster) {
		return args;
	}

	args.unshift(`[W|${cluster.worker.id}]`);
	return args;
}

module.exports = utils;
