process.env.AUTOMATED_RUN = "true";

const task1 = require("./task1");
const task2 = require("./task2");
const { runTask4 } = require("./task4");
const task5 = require("./task5");
const task7 = require("./task7");
const task9 = require("./task9");
const { runTask10 } = require("./task10");
const { runTask11 } = require("./task11");
const task13 = require("./task13");
const { runTask14 } = require("./task14");

const taskMap = {
  "Task 1": { name: "Setup & Entry Execution", runner: task1 },
  "Task 2": { name: "Architecture & Non-Blocking Behaviour", runner: task2 },
  "Task 4": { name: "REPL & Timestamp Formatting", runner: runTask4 },
  "Task 5": { name: "Process Object & CLI Input/Output", runner: () => task5("Random Runner Task", "y") },
  "Task 7": { name: "Debugging Node Programs & Fix Verification", runner: task7 },
  "Task 9": { name: "Node Timers & Global Objects Demo", runner: () => task9(true) },
  "Task 10": { name: "JavaScript Promises & fs.promises", runner: runTask10 },
  "Task 11": { name: "Try/Catch & Async/Await Error Handling", runner: runTask11 },
  "Task 13": { name: "Event Loop Priority (Sync, Microtask, Macrotask)", runner: task13 },
  "Task 14": { name: "EventEmitter & Task Event Listener", runner: runTask14 }
};

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function executeRandomTasks() {
  console.log("==========================================================");
  console.log("🚀 STARTING RANDOM SEQUENCE TASK EXECUTOR FOR 10 TASKS");
  console.log("==========================================================");

  const taskKeys = Object.keys(taskMap);
  const randomOrder = shuffleArray(taskKeys);

  console.log("\n📋 Random Sequence Generated (10 Tasks):");
  randomOrder.forEach((key, index) => {
    console.log(`   ${index + 1}. ${key} — ${taskMap[key].name}`);
  });
  console.log("----------------------------------------------------------\n");

  const executedSummary = [];

  for (let i = 0; i < randomOrder.length; i++) {
    const key = randomOrder[i];
    const taskInfo = taskMap[key];
    console.log(`\n▶️ Executing [Step ${i + 1}/${randomOrder.length}]: ${key} (${taskInfo.name})`);
    
    try {
      const result = await taskInfo.runner();
      executedSummary.push({
        step: i + 1,
        taskId: key,
        name: taskInfo.name,
        status: "SUCCESS",
        result: result || "Executed successfully"
      });
    } catch (err) {
      console.error(`❌ Error in ${key}:`, err.message);
      executedSummary.push({
        step: i + 1,
        taskId: key,
        name: taskInfo.name,
        status: "FAILED",
        result: err.message
      });
    }
  }

  console.log("\n==========================================================");
  console.log("🎉 EXECUTION COMPLETE — SUMMARY OF 10 EXECUTED TASKS");
  console.log("==========================================================");
  console.table(executedSummary.map(item => ({
    "Order": item.step,
    "Task ID": item.taskId,
    "Task Name": item.name,
    "Status": item.status
  })));

  return executedSummary;
}

if (require.main === module) {
  executeRandomTasks();
}

module.exports = executeRandomTasks;
