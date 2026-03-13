import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { saveConfig } from '../config/index.js';

export async function login(): Promise<void> {
  console.log(chalk.bold('\nbbking Login\n'));

  console.log(chalk.cyan('To login, you need an API key.\n'));
  console.log(chalk.gray('Contact the administrator to get your API key.\n'));

  const answer = await inquirer.prompt([
    {
      type: 'password',
      name: 'apiKey',
      message: 'Paste your API key:',
      mask: '*',
      validate: input => input.length > 10 || 'API key seems too short, please check',
    },
  ]);

  const spinner = ora('Saving API key...').start();
  try {
    await saveConfig({
      apiKey: answer.apiKey,
    });

    spinner.succeed(chalk.green('Successfully saved API key!'));
  } catch (error) {
    spinner.fail(chalk.red(`Failed: ${error instanceof Error ? error.message : String(error)}`));
    process.exit(1);
  }
}
