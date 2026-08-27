function runTask1() {
  console.log("[Task 1] Task Logger Started");
  return "Task 1 completed: Printed 'Task Logger Started'";
}

if (require.main === module) {
  runTask1();
}

module.exports = runTask1;
