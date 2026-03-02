import chalk from "chalk";
import { getConfig, isTokenValid } from "../config/index.js";

export async function help(): Promise<void> {
  const config = await getConfig();
  const isLoggedIn = isTokenValid(config);
  const hasApiKey = !!config.apiKey;

  console.log(chalk.bold("\n🍾 bbking CLI\n"));
  console.log(chalk.gray("A CLI for managing bbki.ng content\n"));

  console.log(chalk.bold("AUTHENTICATION:"));
  console.log(`  Supabase Auth: ${isLoggedIn ? chalk.green("✓ Logged in") : chalk.yellow("○ Not logged in")}`);
  console.log(`  API Key:       ${hasApiKey ? chalk.green("✓ Configured") : chalk.yellow("○ Not configured")}\n`);

  console.log(chalk.bold("COMMANDS:"));

  console.log(chalk.cyan("\n  bbking login"));
  console.log("    Login with Supabase access token");

  console.log(chalk.cyan("\n  bbking post list [options]"));
  console.log("    List all posts");
  console.log(chalk.gray("    Options:"));
  console.log(chalk.gray("      --json    Output as JSON"));

  console.log(chalk.cyan("\n  bbking post add [options]"));
  console.log("    Create a new post");
  console.log(chalk.gray("    Options:"));
  console.log(chalk.gray("      --title <title>      Post title"));
  console.log(chalk.gray("      --content <content>  Post content (or opens editor)"));

  console.log(chalk.cyan("\n  bbking post remove <title> [options]"));
  console.log("    Remove a post by title");
  console.log(chalk.gray("    Options:"));
  console.log(chalk.gray("      --force   Skip confirmation"));

  console.log(chalk.cyan("\n  bbking stream list [options]"));
  console.log("    List all stream entries");
  console.log(chalk.gray("    Options:"));
  console.log(chalk.gray("      --limit <n>   Limit number of entries"));
  console.log(chalk.gray("      --json        Output as JSON"));

  console.log(chalk.cyan("\n  bbking stream add [options]"));
  console.log("    Add a new stream entry");
  console.log(chalk.gray("    Options:"));
  console.log(chalk.gray("      --content <content>  Stream content"));
  console.log(chalk.gray("      --type <type>        Stream type (note/article/link/image)"));
  console.log(chalk.gray("      --author <author>    Author name"));

  console.log(chalk.cyan("\n  bbking help"));
  console.log("    Show this help message\n");

  console.log(chalk.bold("EXAMPLES:"));
  console.log(chalk.gray("  bbking login"));
  console.log(chalk.gray("  bbking post list"));
  console.log(chalk.gray('  bbking post add --title "Hello" --content "World"'));
  console.log(chalk.gray('  bbking post remove "Hello" --force'));
  console.log(chalk.gray("  bbking stream list --limit 10"));
  console.log(chalk.gray('  bbking stream add --content "Hello world" --type note\n'));
}
