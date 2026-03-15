import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { getConfig } from '../../config/index.js';
import { createPost } from '../../utils/api.js';

interface AddOptions {
  title?: string;
  content?: string;
  apiKey?: string;
}

export async function add(options: AddOptions): Promise<void> {
  const spinner = ora('Checking API key...').start();

  try {
    const config = await getConfig();

    // Use provided API key or fall back to config
    const apiKey = options.apiKey || config.apiKey;

    if (!apiKey) {
      spinner.fail(chalk.red('API key is required. Provide it via --api-key or set it in config.'));
      process.exit(1);
    }

    spinner.stop();

    let title = options.title;
    let content = options.content;

    if (!title) {
      const answer = await inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Post title:',
          validate: input => input.length > 0 || 'Title is required',
        },
      ]);
      title = answer.title;
    }

    if (!content) {
      const answer = await inquirer.prompt([
        {
          type: 'editor',
          name: 'content',
          message: 'Post content (opens in default editor):',
          validate: input => input.length > 0 || 'Content is required',
        },
      ]);
      content = answer.content;
    }

    spinner.start('Creating post...');

    const post = await createPost(apiKey, title!, content!);

    spinner.succeed(chalk.green(`Post created successfully!`));
    console.log(chalk.gray(`ID: ${post.id}`));
    console.log(chalk.gray(`Title: ${post.title}`));
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to create post: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
