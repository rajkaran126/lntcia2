const fs = require("fs");

function runTask2() {
  return new Promise((resolve) => {
    console.log("[Task 2] Starting fs.readFile demonstration...");
    fs.readFile("tasks.txt", "utf8", (err, data) => {
      if (err) {
        console.log("[Task 2 Callback] Error reading file:", err.message);
      } else {
        console.log("[Task 2 Callback] File contents logged asynchronously:\n" + data.trim());
      }
      resolve("Task 2 completed: Non-blocking fs.readFile demonstrated");
    });
    console.log("[Task 2 Synchronous] This message prints immediately after fs.readFile call.");
  });
}

if (require.main === module) {
  runTask2();
}

module.exports = runTask2;

/*
===================================================================
 EXPECTED OUTPUT:
 -------------------------------------------------------------------
 [Task 2] Starting fs.readFile demonstration...
 [Task 2 Synchronous] This message prints immediately after fs.readFile call.
 [Task 2 Callback] File contents logged asynchronously:
 [26/8/2026, 6:00:00 pm] Initial sample task: Setup Node environment
 [26/8/2026, 6:15:00 pm] Initial sample task: Review V8 and libuv docs
===================================================================
*/
