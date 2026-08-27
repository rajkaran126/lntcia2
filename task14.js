const EventEmitter = require("events");
const { saveTaskPromise } = require("./task10");

const taskEmitter = new EventEmitter();

// Attach listener
taskEmitter.on("taskAdded", (task) => {
  console.log(`[Task 14 EventEmitter Listener] New task added: ${task}`);
});

async function saveTaskAsyncWithEmitter(task) {
  try {
    await saveTaskPromise(task);
    taskEmitter.emit("taskAdded", task);
  } catch (err) {
    console.error("[Task 14 Error]:", err.message);
  }
}

async function runTask14() {
  console.log("[Task 14] Saving task and firing taskAdded event...");
  await saveTaskAsyncWithEmitter("Demonstrate EventEmitter pattern");
  return "Task 14 completed: Fired and handled taskAdded event via EventEmitter";
}

if (require.main === module) {
  runTask14();
}

module.exports = {
  taskEmitter,
  saveTaskAsyncWithEmitter,
  runTask14
};

/*
===================================================================
 EXPECTED OUTPUT:
 -------------------------------------------------------------------
 [Task 14] Saving task and firing taskAdded event...
 [Task 14 EventEmitter Listener] New task added: Demonstrate EventEmitter pattern
===================================================================
*/
