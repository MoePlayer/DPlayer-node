var express = require('express');
var logger = require('./tools/logger');
require('./tools/mongodb');

logger.info(`🍻 DPlayer start! Cheers!`);

var app = express();
app.all('*', require('./routes/all'));
app.get('/', require('./routes/get'));
app.post('/', require('./routes/post'));
// app.get('/list', require('./routes/list'));
app.get('/bilibili', require('./routes/bilibili'));
// app.get('/video/bilibili', require('./routes/video-bilibili'));

app.get('/v2', require('./routes/v2/get'));
app.post('/v2', require('./routes/v2/post'));
app.get('/v2/bilibili', require('./routes/v2/bilibili'));
app.listen(1207);