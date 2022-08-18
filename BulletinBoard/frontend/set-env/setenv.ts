const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

// Checks whether command line argument of `prod` was provided signifying production mode
const isProduction = environment === 'prod';

// choose the correct targetPath based on the environment chosen
const targetPath = isProduction
  ? './src/environments/environment.prod.ts'
  : './src/environments/environment.ts';

//actual content to be compiled dynamically and pasted into respective environment files
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   apiUrl: "${process.env['apiUrl']}",
   storageUrl: "${process.env['storageUrl']}"
};
`;

    writeFile(targetPath, environmentFileContent, function (err:any) {
      if (err) {
        console.log(err);
      }
        console.log(`wrote variables to ${targetPath}`);
    });