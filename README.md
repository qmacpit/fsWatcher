### build image
```docker build -t qmacpit/fs-watcher .```

### running container

```docker run --env FS_WATCH_DIR=/usr/src/app/tmp -v /home/qmacpit/code/fsWatcher/tmp:/usr/src/app/tmp -p 3001:3000 -d qmacpit/fs-watcher```
