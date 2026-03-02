import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { getConfig, saveConfig } from "../../config/index.js";
import { createStream, validateApiKey } from "../../utils/api.js";

interface AddOptions {
  content?: string;
  type?: string;
  author?: string;
}

const VALID_TYPES = ["note", "article", "link", "image"];

export async function add(options: AddOptions): Promise<void> {
  const spinner = ora("Checking configuration...").start();

  try {
    let config = await getConfig();

    // Check/prompt for API key
    let apiKey: string | undefined = config.apiKey;
    if (!apiKey) {
      spinner.stop();
      console.log(chalk.yellow("API key required for streaming API.\n"));

      const answer = await inquirer.prompt([
        {
          type: "password",
          name: "apiKey",
          message: "Enter your API key:",
          mask: "*",
          validate: (input) => input.length > 0 || "API key is required",
        },
      ]);

      apiKey = answer.apiKey;

      // Validate the API key
      spinner.start("Validating API key...");
      const isValid = await validateApiKey(apiKey!);

      if (!isValid) {
        spinner.fail(chalk.red("Invalid API key. Please check and try again."));
        process.exit(1);
      }

      // Save the API key
      await saveConfig({ ...config, apiKey });
      spinner.succeed(chalk.green("API key saved."));
      spinner.start("Creating stream...");
    }

    // Get content
    let content = options.content;
    if (!content) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "content",
          message: "Stream content:",
          validate: (input) => input.length > 0 || "Content is required",
        },
      ]);
      content = answer.content;
      spinner.start("Creating stream...");
    }

    // Get type
    let type = options.type;
    if (!type || !VALID_TYPES.includes(type)) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "list",
          name: "type",
          message: "Stream type:",
          choices: VALID_TYPES,
          default: "note",
        },
      ]);
      type = answer.type;
      spinner.start("Creating stream...");
    }

    // Get author
    let author = options.author;
    if (!author) {
      spinner.stop();
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "author",
          message: "Author name:",
          default: "bbki.ng",
        },
      ]);
      author = answer.author;
      spinner.start("Creating stream...");
    }

    const result = await createStream(apiKey!, content!, type!, author!);

    const stream = result?.data || {}; 

    spinner.succeed(chalk.green("Stream created successfully!"));
    console.log(chalk.gray(`ID: ${stream.id}`));
    console.log(chalk.gray(`Type: ${stream.type}`));
    console.log(chalk.gray(`Created: ${new Date(stream.createdAt).toLocaleString()}`));
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to create stream: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
