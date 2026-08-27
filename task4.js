function getTimestamp() {
  return new Date().toLocaleString();
}

function runTask4() {
  const timestamp = getTimestamp();
  console.log(`[Task 4] Formatted REPL Timestamp: [${timestamp}]`);
  return `Task 4 completed: Created timestamp function: ${timestamp}`;
}

if (require.main === module) {
  runTask4();
}

module.exports = {
  runTask4,
  getTimestamp
};
