# gulp-sequenced-shell-tasks
Snippet to call shell tasks with gulp in order

## Why?
This is something me and everybody here at my company have been looking for for a long time.
And that is the ability to call a shell task from gulp and being able to wait for it to end before continuing with the script.
I understand that very idea of Gulp is run multiple task at the same time concurrently.
But sometimes, like in my case, with Django's collectstatic command, I simply had to wait for it to end before calling on for images to be compressed by gulp-imagemin.

## The Code
Very simple only uses Node's core child_process to call on shell task and listen for it to end.
```javascript
function sequencedShellTasks(list, callback, index) {
  callback = (callback === undefined)? null : callback;
  index = (index === undefined)? 0 : index;
  if (index >= list.length) {
    if (callback !== null && callback !== undefined) {
      return callback();
    } else {
      return;
    }
  }
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
  shell = spawn(task[0], task.slice(1, task.length), {stdio: 'inherit'});
  shell.on('close', function () {
    sequencedShellTasks(list, callback, index+1);
  });
}
```
What everything does is explained in the gulpfile!

## How to use it?
Easy! Just copy the code above put it in your gulpfile.
Make a list of Shell commands you want to do.
And call it like so `sequencedShellTasks(list)`.
You can even pass callback function as second argument.
Like the code bellow!
```javascript
gulp.task('commit', function() {
  var tasks = [
    "git add .",
    "git status",
    "git commit -m '"+argv.m+"'",
    "git push"
  ];
  sequencedShellTasks(tasks, function () {
    console.log("DONE!");
  });
});
```

## Liked it? Star it!

## TO-DO
- Make it a gulp package

## License
MIT
Feel free to modify it and use it if you like it :)
