const fs = require("fs");

function saveTaskCallback(task, callback) {
  const timestamp = new Date().toLocaleString();
  const taskData = `[${timestamp}] ${task}\n`;
  fs.appendFile("tasks.txt", taskData, (err) => {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
}

function saveTaskPromise(task) {
  const timestamp = new Date().toLocaleString();
  const taskData = `[${timestamp}] ${task}\n`;
  return fs.promises.appendFile("tasks.txt", taskData);
}

async function saveTaskAsync(task, taskEmitter = null) {
  try {
    await saveTaskPromise(task);
    if (taskEmitter) {
      taskEmitter.emit("taskAdded", task);
    }
    console.log("Task saved successfully.");
  } catch (err) {
    console.log("Error saving task:", err.message);
  }
}

// Export functions for local module demonstration (Task 15)
module.exports = {
  saveTaskCallback,
  saveTaskPromise,
  saveTaskAsync
};

