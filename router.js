const Router = require('koa-router');
const router = new Router();

router.get('/v3', require('./routes/get'));
router.post('/v3', require('./routes/post'));

module.exports = router;