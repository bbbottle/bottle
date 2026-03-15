import chalk from 'chalk';
import ora from 'ora';
import inquirer from 'inquirer';
import { getConfig } from '../../config/index.js';
import { fetchPosts, removePost } from '../../utils/api.js';

interface RemoveOptions {
  force?: boolean;
  apiKey?: string;
}

export async function remove(title: string, options: RemoveOptions): Promise<void> {
  const spinner = ora('Checking API key...').start();

  try {
    const config = await getConfig();

    // Use provided API key or fall back to config
    const apiKey = options.apiKey || config.apiKey;

    if (!apiKey) {
      spinner.fail(chalk.red('API key is required. Provide it via --api-key or set it in config.'));
      process.exit(1);
    }

    // Verify post exists
    spinner.text = 'Fetching posts...';
    const posts = await fetchPosts();
    const post = posts.find(p => p.title === title);

    if (!post) {
      spinner.fail(chalk.red(`Post with title "${title}" not found.`));
      process.exit(1);
    }

    // Confirm removal unless --force is used
    if (!options.force) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: `Are you sure you want to remove "${title}"?`,
          default: false,
        },
      ]);

      if (!answer.confirm) {
        console.log(chalk.yellow('Cancelled.'));
        process.exit(0);
      }
      spinner.start('Removing post...');
    }

    await removePost(apiKey, post.id);

    spinner.succeed(chalk.green(`Post "${title}" removed successfully.`));
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to remove post: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
