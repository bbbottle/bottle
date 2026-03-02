import chalk from "chalk";
import ora from "ora";
import inquirer from "inquirer";
import { saveConfig } from "../config/index.js";

export async function login(): Promise<void> {
  console.log(chalk.bold("\n🍾 bbking Login\n"));

  console.log(chalk.cyan("To login, you need a Supabase access token.\n"));
  console.log(chalk.gray("Method 1: From browser (easiest)"));
  console.log(chalk.gray("  1. Go to https://bbki.ng/login and login with GitHub"));
  console.log(chalk.gray("  2. Open browser dev tools (F12)"));
  console.log(chalk.gray("  3. Application → Local Storage → https://bbki.ng"));
  console.log(chalk.gray("  4. Copy the 'access_token' from 'supabase.auth.token'\n"));

  console.log(chalk.gray("Method 2: From API call"));
  console.log(chalk.gray("  If you have a valid session token from another source, paste it directly\n"));

  const answer = await inquirer.prompt([
    {
      type: "password",
      name: "token",
      message: "Paste your Supabase access token:",
      mask: "*",
      validate: (input) => input.length > 20 || "Token seems too short, please check",
    },
  ]);

  const spinner = ora("Validating and saving credentials...").start();
  try {
    // Basic JWT validation (3 parts separated by dots)
    const parts = answer.token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid token format - expected JWT with 3 parts (header.payload.signature)");
    }

    // Try to decode and show user info
    try {
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
      const userId = payload.sub;
      const expiresAt = payload.exp ? new Date(payload.exp * 1000).toISOString() : undefined;

      await saveConfig({
        supabaseToken: answer.token,
        userId,
        expiresAt,
      });

      spinner.succeed(chalk.green("Successfully logged in!"));

      if (userId) {
        console.log(chalk.gray(`User ID: ${userId}`));
      }
      if (payload.exp) {
        const expiresIn = Math.floor((payload.exp * 1000 - Date.now()) / 1000 / 60);
        console.log(chalk.gray(`Expires in: ${expiresIn} minutes`));
      }
    } catch {
      // If decoding fails, still save the token
      await saveConfig({
        supabaseToken: answer.token,
      });
      spinner.succeed(chalk.green("Token saved!"));
    }
  } catch (error) {
    spinner.fail(
      chalk.red(`Failed: ${error instanceof Error ? error.message : String(error)}`)
    );
    process.exit(1);
  }
}
