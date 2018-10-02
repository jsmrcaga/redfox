const chalk = require('chalk');
const utils = require('./lib/utils');

class RedFox {
	constructor(level = 5, format) {
		this.level = level;
		this.__format = format || utils.formatDate;
	}

	formatDate(date) {
		return this.__format(date);
	}

	setLevel(level = 5) {
		this.level = level;
	}

	error(...args) {
		if(this.level < 1) {
			return;
		}

		this.uncaught(...args);
	}

	uncaught() {
		let args = Array.prototype.slice.call(arguments);
		args = utils.cluster(args);
		args.unshift(chalk.red(`[${this.formatDate(new Date())}]`));
		console.error.apply(console.error, args);
	}

	warn() {
		if(this.level < 2) {
			return;
		}

		let args = Array.prototype.slice.call(arguments);
		args = utils.cluster(args);
		args.unshift(`[${this.formatDate(new Date())}]`);
		console.warn(chalk.yellow.apply(chalk.yellow, args));
	}

	info() {
		if(this.level < 3) {
			return;
		}

		let args = Array.prototype.slice.call(arguments);
		args = utils.cluster(args);
		args.unshift(`[${this.formatDate(new Date())}]`);
		console.info(chalk.blue.apply(chalk.blue, args));
	}

	success() {
		if(this.level < 4) {
			return;
		}

		let args = Array.prototype.slice.call(arguments);
		args = utils.cluster(args);
		args.unshift(`[${this.formatDate(new Date())}]`);
		console.log(chalk.green.apply(chalk.green, args));
	}

	log() {
		if(this.level < 5) {
			return;
		}

		let args = Array.prototype.slice.call(arguments);
		args = utils.cluster(args);
		args.unshift(`[${this.formatDate(new Date())}]`);
		console.log.apply(console.log, args);
	}
}

RedFox.levels = {
	NONE: 0,
	ERROR: 1,
	WARN: 2,
	INFO: 3,
	SUCCESS: 4,
	ALL: 5
};

module.exports = RedFox;
