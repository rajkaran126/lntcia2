const fs = require("fs");
const { saveTaskPromise } = require("./task10");

async function saveTaskAsync(task) {
  try {
    await saveTaskPromise(task);
    console.log(`[Task 11 Async/Await] Successfully saved task: "${task}"`);
  } catch (err) {
    console.error("[Task 11 Catch Block]:", err.message);
  }
}

async function runTask11() {
  console.log("[Task 11] Running async/await success execution...");
  await saveTaskAsync("Learn Async/Await and Try/Catch");

  console.log("[Task 11] Triggering catch block with non-existent path...");
  try {
    await fs.promises.appendFile("invalid_folder_path/tasks.txt", "Data\n");
  } catch (err) {
    console.log(`[Task 11 Handled Error in Catch]: ${err.message}`);
  }
  return "Task 11 completed: Verified async/await and try/catch block error handling";
}

if (require.main === module) {
  runTask11();
}

module.exports = {
  saveTaskAsync,
  runTask11
};

/*
===================================================================
 EXPECTED OUTPUT:
 -------------------------------------------------------------------
 [Task 11] Running async/await success execution...
 [Task 11 Async/Await] Successfully saved task: "Learn Async/Await and Try/Catch"
 [Task 11] Triggering catch block with non-existent path...
 [Task 11 Handled Error in Catch]: ENOENT: no such file or directory, open 'invalid_folder_path/tasks.txt'
===================================================================
*/
