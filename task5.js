const readline = require("readline");

function runTask5(providedArg = null, simulatedInput = "y") {
  return new Promise((resolve) => {
    const taskDescription = providedArg || process.argv.slice(2).join(" ") || "Sample CLI Task";
    console.log(`[Task 5] Command Line Task Argument: "${taskDescription}"`);

    // If running in automated/non-interactive runner, simulate response
    if (process.env.AUTOMATED_RUN || !process.stdin.isTTY) {
      console.log(`[Task 5] Prompt: Save this task? (y/n): ${simulatedInput}`);
      if (simulatedInput.toLowerCase() === "y") {
        console.log(`[Task 5] Task "${taskDescription}" confirmed and saved.`);
      } else {
        console.log(`[Task 5] Task "${taskDescription}" was cancelled.`);
      }
      return resolve("Task 5 completed: Processed CLI argument and user confirmation");
    }

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Save this task? (y/n): ", (answer) => {
      if (answer.trim().toLowerCase() === "y") {
        console.log(`[Task 5] Task "${taskDescription}" saved.`);
      } else {
        console.log(`[Task 5] Task "${taskDescription}" not saved.`);
      }
      rl.close();
      resolve("Task 5 completed: Processed interactive terminal input");
    });
  });
}

if (require.main === module) {
  runTask5();
}

module.exports = runTask5;
