# DPlayer node

> Node.js backend for [DPlayer](https://github.com/DIYgod/DPlayer)

## Usage

### Start

```shell
docker-compose build
docker-compose pull
docker-compose up # -d for run it in the background
```

### Data & logs

Database data: `~/dplayer/db`
DPlayer logs: `~/dplayer/logs`
PM2 logs: `~/dplayer/pm2logs`

### Import

```shell
mv dans.json ~/dplayer/db/backup/dans.json
docker exec dplayernode_mongo_1 mongoimport -d danmaku -c dans --file /data/db/backup/dans.json
```

### Export

```shell
docker exec dplayernode_mongo_1 mongoexport -d danmaku -c dans -o /data/db/backup/dans.json
cat ~/dplayer/db/backup/dans.json
```

### Stop

```shell
docker-compose stop
```

## Communication Groups

[Telegram Group](https://t.me/adplayer)

## Author

**DPlayer-node** © [DIYgod](https://github.com/DIYgod), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by DIYgod with help from contributors ([list](https://github.com/MoePlayer/DPlayer-node/contributors)).

> Blog [@DIYgod](https://diygod.me) · GitHub [@DIYgod](https://github.com/DIYgod) · Twitter [@DIYgod](https://twitter.com/DIYgod) · Telegram Channel [@awesomeDIYgod](https://t.me/awesomeDIYgod)
