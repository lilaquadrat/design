const fs = require('fs');
const chalk = require('chalk');

module.exports = (env) => {

  env.project === 'base' ? 'base' : 'projects'

  let cliData;
  let useData;
  let returnData = {};
  let purple = chalk.hex('#533474');

  try {

    cliData = fs.readFileSync('.lila');
    cliData = JSON.parse(cliData);

  } catch (error) {

    console.error(error);

  }

  if(cliData && !env.noCli) {

    useData = cliData.publish;
    console.log('');
    console.log(purple.bold('cli data used (.lila)'));
    console.log(purple('use `yarn cli config` to configure'));
    console.log('');
    console.log(purple('company:'), chalk.white(useData.company));
    console.log(purple('project:'), chalk.white(useData.project));
    console.log('');
    console.log('');
    
  } else {
    
    useData = env;
    console.log('');
    console.log(purple.bold('no cli data found, using env (.lila)'));
    console.log(purple('use `yarn cli config` to configure'));
    console.log('');
    console.log(purple('company:'), chalk.bgGreen.white(useData.company));
    console.log(purple('project:'), chalk.bgGreen.white(useData.project));
    console.log('');
    console.log('');

  }

  returnData.path = env.project === 'base' ? 'base' : 'projects';
  returnData.company = useData.company;
  returnData.project = useData.project;

  return returnData;
}