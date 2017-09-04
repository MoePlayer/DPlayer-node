# DPlayer backend

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

[QQ Group: 415835947](https://shang.qq.com/wpa/qunwpa?idkey=bf22213ae0028a82e5adf3f286dfd4f01e0997dc9f1dcd8e831a0a85e799be17)

## Related Projects

- [DPlayer](https://github.com/DIYgod/DPlayer)

- [DPlayer-data(weekly backup for api.prprpr.me/dplayer)](https://github.com/DIYgod/DPlayer-data)

- [DPlayer-for-typecho](https://github.com/volio/DPlayer-for-typecho)

- [Hexo-tag-dplayer](https://github.com/NextMoe/hexo-tag-dplayer)

- [DPlayer_for_Z-BlogPHP](https://github.com/fghrsh/DPlayer_for_Z-BlogPHP)

- [纸飞机视频区插件(DPlayer for Discuz!)](https://coding.net/u/Click_04/p/video/git)

- [dplayer_py_backend](https://github.com/dixyes/dplayer_py_backend)

- [dplayer_lua_backend](https://github.com/dixyes/dplayer_lua_backend)

- [DPlayer for WordPress](https://github.com/BlueCocoa/DPlayer-WordPress)

- [Vue-DPlayer](https://github.com/sinchang/vue-dplayer)

## LICENSE

[The Star And Thank Author License (SATA)](https://github.com/DIYgod/DPlayer/blob/master/LICENSE)