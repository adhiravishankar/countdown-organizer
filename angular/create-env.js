const fse = require('fs-extra');
const dotenv = require('dotenv');

// Load environment variables from .env file
const envConfig = dotenv.parse(fse.readFileSync('.env'));

// Convert environment variables to object
const envObject = Object.keys(envConfig).reduce((prev, next) => {
  prev[next] = envConfig[next];
  return prev;
}, {});

// Generate environment.ts file with environment variables
fse.writeFileSync(
  './src/environments/environment.ts',
  `export const environment = {
    API_URL: '${ envObject.API_URL }',
    PRODUCTION: ${ envObject.PRODUCTION },
};
`
);

console.log('.env variables have been added to environment.ts');
