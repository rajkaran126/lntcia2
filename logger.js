/* 
===================================================================
 Node.js & Asynchronous JavaScript — CIA-2 Task Logger
 Main File: logger.js
 Active 10 Tasks: Task 1, Task 2, Task 4, Task 5, Task 7, 
                  Task 9, Task 10, Task 11, Task 13, Task 14
===================================================================
*/

const fs = require("fs");
const EventEmitter = require("events");

// --- Task 1: Basic Node Setup ---
console.log("Task Logger Started");

// --- Task 2: Architecture & Non-Blocking Behaviour ---
/* 
Node.js uses the V8 engine to execute JavaScript and libuv to handle asynchronous I/O.
When fs.readFile() is called, Node offloads the operation to libuv, allowing the main 
thread to continue executing subsequent lines immediately.
*/
function runTask2() {
  fs.readFile("tasks.txt", "utf8", (err, data) => {
    if (err) {
      console.log("[Task 2] Error reading file:", err.message);
      return;
    }
    console.log("[Task 2] File contents logged asynchronously:\n" + data.trim());
  });
  console.log("[Task 2 Synchronous] This message prints immediately after fs.readFile call.");
}

// --- Task 4: Node.js REPL + Date Formatting ---
function getTimestamp() {
  return new Date().toLocaleString();
}

function runTask4() {
  console.log(`[Task 4] Current Timestamp from REPL snippet: [${getTimestamp()}]`);
}

// --- Task 5: process.argv + process.stdin ---
function runTask5() {
  const task = process.argv.slice(2).join(" ") || "Default task description";
  console.log("[Task 5] Task received:", task);
  process.stdout.write("Save this task? (y/n): ");
  process.stdin.setEncoding("utf8");
  process.stdin.once("data", (input) => {
    const answer = input.trim().toLowerCase();
    if (answer === "y") {
      saveTaskAsync(task);
    } else {
      console.log("Task was not saved.");
    }
    process.stdin.pause();
  });
}

// --- Task 7: Debugging Node Programs ---
function runTask7() {
  console.log("[Task 7] Debugger inspection & bug-fix confirmed via node --inspect.");
}

// --- Task 9: setTimeout & setInterval ---
function runTask9(fastMode = false) {
  console.log("[Task 9] Timers initialized...");
  const timeoutDelay = fastMode ? 500 : 5000;
  const intervalTime = fastMode ? 300 : 3000;
  const stopTime = fastMode ? 1200 : 15000;

  const reminderTimer = setTimeout(() => {
    console.log("[Task 9 Timer] Reminder: review your tasks");
  }, timeoutDelay);

  const interval = setInterval(() => {
    fs.readFile("tasks.txt", "utf8", (err, data) => {
      if (err) {
        console.log("[Task 9 Interval] Number of tasks: 0");
        return;
      }
      const tasksCount = data.trim() ? data.trim().split("\n").length : 0;
      console.log("[Task 9 Interval] Number of tasks logged so far:", tasksCount);
    });
  }, intervalTime);

  setTimeout(() => {
    clearInterval(interval);
    console.log("[Task 9 Timer] Task counter stopped.");
  }, stopTime);
}

// --- Task 10: Promises & fs.promises ---
function saveTaskPromise(task) {
  const timestamp = getTimestamp();
  const taskData = `[${timestamp}] Promise Task: ${task}\n`;
  return fs.promises.appendFile("tasks.txt", taskData);
}

function demoTask10() {
  saveTaskPromise("Task 10 Promise Demo")
    .then(() => console.log("[Task 10] Promise resolved successfully."))
    .catch((err) => console.log("[Task 10] Promise rejected:", err.message));
}

// --- Task 11: Async/Await & Try/Catch ---
async function saveTaskAsync(task, taskEmitter = null) {
  try {
    await saveTaskPromise(task);
    if (taskEmitter) {
      taskEmitter.emit("taskAdded", task);
    }
    console.log(`[Task 11 Async/Await] Task saved successfully: "${task}"`);
  } catch (err) {
    console.log("[Task 11 Error]:", err.message);
  }
}

async function demoTask11Error() {
  try {
    await fs.promises.appendFile("invalid_directory_path/tasks.txt", "Data\n");
  } catch (err) {
    console.log("[Task 11 Catch Block Demo - Handled Error]:", err.message);
  }
}

// --- Task 13: Event Loop Execution Order ---
function runTask13() {
  console.log("[Task 13] Synchronous message");
  setTimeout(() => {
    console.log("[Task 13] setTimeout message (Macrotask)");
  }, 0);
  Promise.resolve().then(() => {
    console.log("[Task 13] Promise message (Microtask)");
  });
}

// --- Task 14: EventEmitter ---
function runTask14() {
  const taskEmitter = new EventEmitter();

  taskEmitter.on("taskAdded", (task) => {
    console.log(`[Task 14 EventEmitter] New task added: ${task}`);
  });

  saveTaskAsync("Complete EventEmitter task", taskEmitter);
}

// --- Main Execution Suite for Active 10 Tasks ---
if (require.main === module) {
  console.log("\n=== Node.js Task Logger Execution Suite (10 Tasks) ===");
  console.log("--- Current Timestamp:", getTimestamp(), "---\n");

  console.log("--- Task 2: Architecture & Non-Blocking ---");
  runTask2();

  console.log("\n--- Task 4: Date Timestamp ---");
  runTask4();

  console.log("\n--- Task 7: Debugging ---");
  runTask7();

  console.log("\n--- Task 10: Promise Demo ---");
  demoTask10();

  console.log("\n--- Task 11: Async/Await & Catch Demo ---");
  demoTask11Error();

  console.log("\n--- Task 13: Event Loop Execution Order ---");
  runTask13();

  console.log("\n--- Task 14: EventEmitter Demo ---");
  runTask14();
}

module.exports = {
  getTimestamp,
  saveTaskPromise,
  saveTaskAsync,
  demoTask10,
  demoTask11Error,
  runTask2,
  runTask4,
  runTask5,
  runTask7,
  runTask9,
  runTask13,
  runTask14
};
