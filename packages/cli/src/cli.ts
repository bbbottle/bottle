#!/usr/bin/env node

import { program } from "commander";
import { login } from "./commands/login.js";
import { add as addPost } from "./commands/post/add.js";
import { list as listPosts } from "./commands/post/list.js";
import { remove as removePost } from "./commands/post/remove.js";
import { add as addStream } from "./commands/stream/add.js";
import { list as listStreams } from "./commands/stream/list.js";
import { remove as removeStream } from "./commands/stream/remove.js";
import { help } from "./commands/help.js";

program
  .name("bbking")
  .description("CLI for managing bbki.ng content")
  .version("0.0.1");

// Login command
program
  .command("login")
  .description("Login via GitHub OAuth")
  .action(login);

// Post commands
const postCmd = program
  .command("post")
  .description("Manage posts");

postCmd
  .command("list")
  .description("List all posts")
  .option("--json", "Output as JSON")
  .action(listPosts);

postCmd
  .command("add")
  .description("Create a new post")
  .option("--title <title>", "Post title")
  .option("--content <content>", "Post content (or opens editor)")
  .action(addPost);

postCmd
  .command("remove <title>")
  .description("Remove a post by title")
  .option("--force", "Skip confirmation")
  .action(removePost);

// Stream commands
const streamCmd = program
  .command("stream")
  .description("Manage stream entries");

streamCmd
  .command("list")
  .description("List all stream entries")
  .option("--before <id>", "Fetch records older than this ID (for pagination)")
  .option("--after <id>", "Fetch records newer than this ID (for polling new messages)")
  .option("--offset <n>", "Number of records to fetch (default: 8)")
  .option("--json", "Output as JSON")
  .action(listStreams);

streamCmd
  .command("add")
  .description("Add a new stream entry")
  .option("--content <content>", "Stream content")
  .option("--type <type>", "Stream type (note/article/link/image)")
  .option("--author <author>", "Author name")
  .option("--api-key <key>", "API key for authentication")
  .action(addStream);

streamCmd
  .command("rm <id>")
  .description("Remove a stream entry by ID")
  .option("--force", "Skip confirmation")
  .option("--api-key <key>", "API key for authentication")
  .action(removeStream);

// Help command
program
  .command("help")
  .description("Show help information")
  .action(help);

// Parse CLI arguments
program.parse();

// Show help if no command provided
if (process.argv.length <= 2) {
  help();
}
