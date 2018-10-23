const expect = require('chai').expect;
const sinon = require('sinon');

const RedFox = require('../redfox');

describe('Generic tests', () => {
	it('Should instanciate a logger', () => {
		let logger = new RedFox();

		expect(logger.level).to.be.eql(5);
		expect(logger.error).to.be.instanceOf(Function);
		expect(logger.info).to.be.instanceOf(Function);
		expect(logger.warn).to.be.instanceOf(Function);
		expect(logger.log).to.be.instanceOf(Function);
		expect(logger.uncaught).to.be.instanceOf(Function);
		expect(logger.success).to.be.instanceOf(Function);
	});

	it('Should be able to change level', () => {
		let logger = new RedFox(1);
		expect(logger.level).to.be.eql(1);

		logger.setLevel();
		expect(logger.level).to.be.eql(5);

		logger.setLevel(3);
		expect(logger.level).to.be.eql(3);
	});

	it('Should not call because of levels', () => {
		console.log = sinon.spy(console, 'log');
		console.error = sinon.spy(console, 'error');
		console.warn = sinon.spy(console, 'warn');
		console.info = sinon.spy(console, 'info');

		let logger = new RedFox(RedFox.levels.NONE);
		logger.log('log');
		logger.info('info');
		logger.warn('warn');
		logger.error('error');
		logger.success('success');
		logger.uncaught('uncaught');

		expect(console.log.callCount).to.be.eql(0);
		expect(console.error.callCount).to.be.eql(1);
		expect(console.warn.callCount).to.be.eql(0);
		expect(console.info.callCount).to.be.eql(0);
	});

	it('Should call console functions', () => {
		let logger = new RedFox();
		logger.log('log');
		logger.info('info');
		logger.warn('warn');
		logger.error('error');
		logger.success('success');
		logger.uncaught('uncaught');

		expect(console.log.callCount).to.be.eql(3);
		expect(console.error.callCount).to.be.eql(3);
		expect(console.warn.callCount).to.be.eql(1);
		expect(console.info.callCount).to.be.eql(1);
	});

	it('Should register an error callback', () => {
		let logger  = new RedFox();
		logger.on('error', () => {});

		expect(Object.keys(logger.__events).length).to.be.eql(1);
		expect(logger.__events).to.have.property('error');
		expect(logger.__events.error).to.be.instanceOf(Array);
		expect(logger.__events.error.length).to.be.eql(1);
	});

	it('Should register an error callback and call it', done => {
		let logger  = new RedFox();
		logger.on('error', () => done());

		logger.error('This is an error');
	});

	it('Should throw when registering bullshit', () => {
		let logger  = new RedFox();
		
		expect(() => logger.on('bs', () => {})).to.throw();
	})
});
