import chalk from "chalk";
import ora from "ora";
import { fetchStreams } from "../../utils/api.js";

interface ListOptions {
  limit?: string;
  json?: boolean;
}

export async function list(options: ListOptions): Promise<void> {
  const spinner = ora("Fetching streams...").start();

  try {
    const limit = options.limit ? parseInt(options.limit, 10) : undefined;
    const response = await fetchStreams(limit);
    const streams = response.data;

    spinner.stop();

    if (options.json) {
      console.log(JSON.stringify(streams, null, 2));
      return;
    }

    if (streams.length === 0) {
      console.log(chalk.yellow("No streams found."));
      return;
    }

    console.log(chalk.bold(`\nFound ${streams.length} stream(s):\n`));

    streams.forEach((stream, index) => {
      const date = new Date(stream.createdAt).toLocaleString();
      const typeColor =
        stream.type === "article"
          ? "blue"
          : stream.type === "link"
            ? "green"
            : stream.type === "image"
              ? "magenta"
              : "cyan";

      console.log(`${chalk.cyan(`${index + 1}.`)} ${chalk[typeColor](`[${stream.type}]`)}`);
      console.log(`   ${stream.content}`);
      console.log(`   ${chalk.gray(`By: ${stream.author} | ${date}`)}`);
      console.log(`   ${chalk.gray(`ID: ${stream.id}`)}`);
      console.log();
    });
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed to list streams: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
