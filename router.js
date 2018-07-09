const Router = require('koa-router');
const router = new Router();

router.get('/v3', require('./routes/get'));
router.post('/v3', require('./routes/post'));
router.get('/v3/bilibili', require('./routes/bilibili'));

module.exports = router;