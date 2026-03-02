import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { getConfig, isTokenValid } from "../../config/index.js";
import { fetchPosts, removePost } from "../../utils/api.js";

interface RemoveOptions {
  force?: boolean;
}

export async function remove(title: string, options: RemoveOptions): Promise<void> {
  const spinner = ora("Checking authentication...").start();

  try {
    const config = await getConfig();

    if (!isTokenValid(config)) {
      spinner.fail(chalk.red("Not authenticated. Please run 'bbking login' first."));
      process.exit(1);
    }

    const token = config.supabaseToken!;

    // Verify post exists
    spinner.text = "Fetching posts...";
    const posts = await fetchPosts(token);
    const post = posts.find((p) => p.title === title);

    if (!post) {
      spinner.fail(chalk.red(`Post with title "${title}" not found.`));
      process.exit(1);
    }

    // Confirm removal unless --force is used
    if (!options.force) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `Are you sure you want to remove "${title}"?`,
          default: false,
        },
      ]);

      if (!answer.confirm) {
        console.log(chalk.yellow("Cancelled."));
        process.exit(0);
      }
      spinner.start("Removing post...");
    }

    await removePost(token, title);

    spinner.succeed(chalk.green(`Post "${title}" removed successfully.`));
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to remove post: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
