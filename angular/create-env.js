const fse = require('fs-extra');
const dotenv = require('dotenv');

dotenv.config();


// Generate environment.ts file with environment variables
fse.outputFileSync(
  './src/environments/environment.ts',
  `export const environment = {
    API_URL: '${ process.env.API_URL }',
    PRODUCTION: ${ process.env.PRODUCTION },
};
`
);

console.log('.env variables have been added to environment.ts');
