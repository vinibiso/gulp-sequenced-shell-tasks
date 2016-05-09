# gulp-sequenced-shell-tasks
Call shell tasks with gulp in order

## Installation
Install through NPM and save it on your devDependencies with:

`npm install --save-dev gulp-sequenced-shell-tasks`

## How to use it?
```javascript
var sequencedShellTasks = require('gulp-sequenced-shell-tasks')

gulp.task('commit', function() {
  var tasks = [
    "echo 'a'",
    "echo 'b'",
    "echo 'c'"
  ];
  sequencedShellTasks(tasks, function () {
    console.log("DONE!");
  });
});
```
You don't need to pass it a callback, you could just call it passing the tasks:
```javascript
sequencedShellTasks(tasks);
```

## Why?
This is something me and everybody here at my company have been looking for for a long time.

And that is the ability to call a shell task from gulp and being able to wait for it to end before continuing with the script.

I understand that very idea of Gulp is run multiple task at the same time concurrently.

But sometimes, like in my case, with Django's collectstatic command, I simply had to wait for it to end before calling on for images to be compressed by gulp-imagemin.


## Liked it? Star it!

## License
MIT
Feel free to modify it and use it if you like it :)
