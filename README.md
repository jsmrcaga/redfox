# Redfox

A (very) simple logger for small projects

## tl;dr
```js
const redfox = require('redfox');

// Optional level log, optional date format
// default date format is YYYY/MM/DD | HH:MM:SS
const myLogger = redfox(refox.levels.ALL, (date) => date.toLocaleString());

myLogger.log('Test');
myLogger.error(new Error());
myLogger.uncaught(new Error()); // skips level check and logs
myLogger.info('Hey!');
myLogger.warn('🚧');
myLogger.success('⚡️');
```

## Installation
SUpposing you have Node and npm installed:

```
npm i redfox
```

## API

### static `levels`
Returns:

```js
{
	NONE: 0,
	ERROR: 1,
	WARN: 2,
	INFO: 3,
	SUCCESS: 4,
	ALL: 5
}
```

### `constructor(level = 5, format = defaultFormat)`
`defaultFormat(date)` returns `YYYY/MM/DD | HH:MM:SS`

### `setLevel(level)`
Sets the level. Must be an int.

### `error()`
Logs if: `level > 0`

This method will only render the date in red.
Formatting error objects is lost to `chalk` otherwise.

### `uncaught()`
Skips level checking

### `warn()`
Logs if: `level > 1`

### `info()`
Logs if: `level > 2`

### `success()`
Logs if: `level > 3`

### `log()`
Logs if: `level > 4`
