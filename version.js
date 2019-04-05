const { version, name } = require('./package.json');
const { resolve, relative } = require('path');
const { writeFileSync } = require('fs');

const versionInfo = { version: version, appName: name };

const file = resolve(__dirname, 'src', 'environments', 'version.ts');
writeFileSync(file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!

// **** Versioning info ( MAJOR.MINOR.PATCH ) ****
// MAJOR: Used for structural changes
// MINOR: Used for functionality changes that require a local storage reset
// PATCH: Used for functionality changes that not require a local storage reset

/* tslint:disable */
export const VERSION = ${JSON.stringify(versionInfo, null, 4)};
/* tslint:enable */
`, { encoding: 'utf-8' });

