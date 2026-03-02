import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { getConfig } from "../../config/index.js";
import { fetchStreams, removeStream } from "../../utils/api.js";

interface RemoveOptions {
  force?: boolean;
  apiKey?: string;
}

export async function remove(id: string, options: RemoveOptions): Promise<void> {
  const spinner = ora("Checking configuration...").start();

  try {
    const config = await getConfig();

    // Check for API key (priority: CLI option > config)
    const apiKey = options.apiKey || config.apiKey;
    if (!apiKey) {
      spinner.fail(chalk.red("API key required. Provide it with --api-key option or run 'bbking login' to configure your API key."));
      process.exit(1);
    }

    // Verify stream exists
    spinner.text = "Fetching streams...";
    const response = await fetchStreams();
    const streams = response.data || [];
    const stream = streams.find((s) => s.id === id);

    if (!stream) {
      spinner.fail(chalk.red(`Stream with ID "${id}" not found.`));
      process.exit(1);
    }

    // Confirm removal unless --force is used
    if (!options.force) {
      spinner.stop();
      console.log(chalk.gray(`Content: ${stream.content.slice(0, 100)}${stream.content.length > 100 ? '...' : ''}`));
      console.log(chalk.gray(`Type: ${stream.type}`));
      console.log(chalk.gray(`Created: ${new Date(stream.createdAt).toLocaleString()}`));
      console.log();

      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: `Are you sure you want to remove this stream entry?`,
          default: false,
        },
      ]);

      if (!answer.confirm) {
        console.log(chalk.yellow("Cancelled."));
        process.exit(0);
      }
      spinner.start("Removing stream...");
    }

    await removeStream(apiKey, id);

    spinner.succeed(chalk.green(`Stream "${id}" removed successfully.`));
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to remove stream: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
