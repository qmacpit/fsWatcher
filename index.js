const chokidar = require('chokidar');
const express = require('express');
const path = require('path');

const watchPath = process.env.FS_WATCH_DIR || path.join(__dirname, 'tmp');

console.log(`watching dir: ${watchPath}`);

const watcher = chokidar.watch(watchPath, {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

let fsEvents = [];
const trackEvent = (type, path) => {
  fsEvents.push({
    type, 
    path,
    time: (new Date()).toISOString()
  })
};
watcher
  .on('add', (path) => {
    console.log(`File ${path} has been added`);
    trackEvent('add', path);
  })
  .on('change', (path) => {
    console.log(`File ${path} has been changed`);
    trackEvent('change', path);
  })
  .on('unlink', (path) => {
    console.log(`File ${path} has been removed`);
    trackEvent('add', path);
  });


const app = express();
const port = 3000;

app.get('/fsEvents', (req, res) => res.json(fsEvents));
app.delete('/fsEvents', (req, res) => {
  fsEvents = [];
  res.status(201).end();
});

app.listen(port, () => console.log(`fsWatcher listening on port ${port}!`));
