function runTask13() {
  return new Promise((resolve) => {
    console.log("[Task 13 Log 1] Synchronous Step 1");

    setTimeout(() => {
      console.log("[Task 13 Log 3] SetTimeout Macrotask Step 3");
      resolve("Task 13 completed: Verified Event Loop execution order (Sync -> Microtask -> Macrotask)");
    }, 0);

    Promise.resolve().then(() => {
      console.log("[Task 13 Log 2] Promise Microtask Step 2");
    });
  });
}

if (require.main === module) {
  runTask13();
}

module.exports = runTask13;
