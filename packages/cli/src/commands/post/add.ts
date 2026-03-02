import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { getConfig, isTokenValid } from "../../config/index.js";
import { createPost } from "../../utils/api.js";

interface AddOptions {
  title?: string;
  content?: string;
}

export async function add(options: AddOptions): Promise<void> {
  const spinner = ora("Checking authentication...").start();

  try {
    const config = await getConfig();

    if (!isTokenValid(config)) {
      spinner.fail(chalk.red("Not authenticated. Please run 'bbking login' first."));
      process.exit(1);
    }

    const token = config.supabaseToken!;

    let title = options.title;
    let content = options.content;

    if (!title) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: "Post title:",
          validate: (input) => input.length > 0 || "Title is required",
        },
      ]);
      title = answer.title;
      spinner.start();
    }

    if (!content) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "editor",
          name: "content",
          message: "Post content (opens in default editor):",
          validate: (input) => input.length > 0 || "Content is required",
        },
      ]);
      content = answer.content;
      spinner.start("Creating post...");
    }

    const post = await createPost(token, title!, content!);

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
