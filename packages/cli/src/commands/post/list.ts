import chalk from 'chalk';
import ora from 'ora';
import { fetchPosts } from '../../utils/api.js';

interface ListOptions {
  json?: boolean;
}

export async function list(options: ListOptions): Promise<void> {
  const spinner = ora('Fetching posts...').start();

  try {
    const posts = await fetchPosts();

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(posts, null, 2));
      return;
    }

    if (posts.length === 0) {
      console.log(chalk.yellow('No posts found.'));
      return;
    }

    console.log(chalk.bold(`\nFound ${posts.length} post(s):\n`));

    posts.forEach((post, index) => {
      const date = new Date(post.createdAt).toLocaleDateString();
      console.log(`${chalk.cyan(`${index + 1}.`)} ${chalk.bold(post.title)}`);
      console.log(`   ${chalk.gray(`ID: ${post.id}`)}`);
      console.log(`   ${chalk.gray(`Created: ${date}`)}`);
      console.log();
    });
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to list posts: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
