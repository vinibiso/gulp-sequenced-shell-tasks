var gulp = require('gulp');
// Only used for the example
var argv = require('yargs').argv;
// Use Node's Swpan from child_process
// to call a on a shell task and listen when it closes
var spawn = require('child_process').spawn;

// Calls Shell tasks in order based on list
// Accepts a callback as a second argument
// And and index which is used only to call next command
function sequencedShellTasks(list, callback, index) {
  callback = (callback === undefined)? null : callback;
  index = (index === undefined)? 0 : index;
  // Check to call callback when sequence ended
  if (index >= list.length) {
    if (callback !== null && callback !== undefined) {
      return callback();
    } else {
      return;
    }
  }
  // Divide shell string so that parameters can be passed to Spawn
  var regExp = /[^\s']+|'([^']*)'/gi;
  var str = list[index];
  var task = [];
  var match;
  do {
    match = regExp.exec(str);
    if (match !== null) {
        task.push(match[1] ? "'"+match[1]+"'" : match[0]);
    }
  } while (match !== null);
  // Start the Shell task with its parameters and tells it to log
  shell = spawn(task[0], task.slice(1, task.length), {stdio: 'inherit'});
  // Start listener for when the command ends to call the next one
  shell.on('close', function () {
    sequencedShellTasks(list, callback, index+1);
  });
}

// Test Task to Add all files, comit and push
gulp.task('test', function() {
  var tasks = [
    "echo 'a'",
    "echo 'b'",
    "echo 'c'"
  ];
  sequencedShellTasks(tasks, function () {
    console.log("DONE!");
  });
});

// Test Task to Add all files, comit and push
gulp.task('commit', function() {
  var tasks = [
    "git add .",
    "git status",
    "git commit -m '"+argv.m+"'",
    "git push"
  ];
  sequencedShellTasks(tasks, function () {
    console.log("DONE!");
  }, 0);
});
