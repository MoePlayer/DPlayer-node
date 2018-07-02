const Router = require('koa-router');
const router = new Router();

router.get('/', require('./routes/get'));
router.post('/', require('./routes/post'));

module.exports = router;