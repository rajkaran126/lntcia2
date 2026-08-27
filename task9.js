const fs = require("fs");

function runTask9(fastMode = true) {
  return new Promise((resolve) => {
    console.log("[Task 9] Timers initialized...");
    const timeoutDelay = fastMode ? 500 : 5000;
    const intervalTime = fastMode ? 300 : 3000;
    const stopTime = fastMode ? 1200 : 15000;

    const reminderTimer = setTimeout(() => {
      console.log("[Task 9 Timer] Reminder: review your tasks");
    }, timeoutDelay);

    const interval = setInterval(() => {
      fs.readFile("tasks.txt", "utf8", (err, data) => {
        const count = err || !data.trim() ? 0 : data.trim().split("\n").length;
        console.log(`[Task 9 Interval] Number of tasks logged so far: ${count}`);
      });
    }, intervalTime);

    setTimeout(() => {
      clearInterval(interval);
      console.log("[Task 9 Timer] Timer interval cleared with clearInterval.");
      resolve("Task 9 completed: Demonstrated setTimeout, setInterval, and clearInterval");
    }, stopTime);
  });
}

if (require.main === module) {
  runTask9(false);
}

module.exports = runTask9;

/*
===================================================================
 EXPECTED OUTPUT:
 -------------------------------------------------------------------
 [Task 9] Timers initialized...
 [Task 9 Interval] Number of tasks logged so far: 2
 [Task 9 Timer] Reminder: review your tasks
 [Task 9 Interval] Number of tasks logged so far: 2
 [Task 9 Interval] Number of tasks logged so far: 2
 [Task 9 Timer] Timer interval cleared with clearInterval.
===================================================================
*/
